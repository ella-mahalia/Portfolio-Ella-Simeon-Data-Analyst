"""Build honest rolling-week forecast, holdout scores and standalone dashboard.

Run `python fetch_data.py` once to refresh the public data, then `python analyze.py`.
Requires only Python's standard library.
"""
from __future__ import annotations

import csv
import datetime as dt
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STATIONS = {"611": "Times Sq / Port Authority", "610": "Grand Central", "607": "Herald Square", "616": "Jackson Heights / Roosevelt Av", "447": "Flushing / Main St"}
VALIDATION = dt.datetime(2026, 8, 3)
HOLDOUT = dt.datetime(2026, 8, 17)
FUTURE = dt.datetime(2026, 9, 17)
WEEK = dt.timedelta(days=7)


def read_data():
    series = defaultdict(dict)
    metadata = {}
    with (ROOT / "station_hourly.csv").open(newline="") as handle:
        for row in csv.DictReader(handle):
            sid = row["station_complex_id"]
            hour = dt.datetime.fromisoformat(row["transit_timestamp"])
            series[sid][hour] = float(row["ridership"])
            metadata[sid] = {"name": STATIONS[sid], "full_name": row["station_complex"], "borough": row["borough"]}
    return series, metadata


def predict(series, cutoff, method, target):
    """A fixed seven-day forecast; uses observations strictly BEFORE cutoff."""
    if target < cutoff or target >= cutoff + WEEK:
        raise ValueError("Target outside one-week forecast horizon")
    previous = [series.get(target - n * WEEK) for n in range(1, 5) if target - n * WEEK < cutoff]
    if method == "prior_week":
        return previous[0] if previous else None
    available = [n for n in previous if n is not None]
    return sum(available) / len(available) if len(available) >= 2 else None


def metrics(series, cutoff, method):
    pairs = []
    for index in range(168):
        target = cutoff + dt.timedelta(hours=index)
        yhat = predict(series, cutoff, method, target)
        actual = series.get(target)
        if yhat is not None and actual is not None:
            pairs.append((actual, yhat))
    if not pairs:
        return {"wape": None, "mae": None, "coverage": 0}
    return {"wape": round(100 * sum(abs(a-p) for a,p in pairs) / sum(a for a,_ in pairs), 1),
            "mae": round(sum(abs(a-p) for a,p in pairs) / len(pairs), 1),
            "coverage": len(pairs)}


def main():
    series, meta = read_data()
    if not series:
        raise ValueError("No station-hour records")
    dates = [h for values in series.values() for h in values]
    first, last = min(dates), max(dates)
    if last < FUTURE - dt.timedelta(hours=1):
        raise ValueError("Data does not include all hours up to Sep 16, 2026")
    summary = {"source": "MTA Subway Hourly Ridership: Beginning 2025 (NY Open Data, 5wq4-mkjj)",
               "metric": "Estimated paid subway entrances (sum across payment method and fare categories); not exits, unique riders, occupancy, or train capacity.",
               "source_url": "https://data.ny.gov/Transportation/MTA-Subway-Hourly-Ridership-Beginning-2025/5wq4-mkjj",
               "first_hour": first.isoformat(), "last_hour": last.isoformat(),
               "validation_week": VALIDATION.date().isoformat(), "holdout_week": HOLDOUT.date().isoformat(),
               "forecast_week": FUTURE.date().isoformat(), "stations": {}, "missing_station_hours": 0}
    forecasts, holdout = [], []
    for sid in STATIONS:
        values = series[sid]
        val = {m: metrics(values, VALIDATION, m) for m in ("prior_week", "four_week_mean")}
        if any(v["coverage"] < 160 for v in val.values()):
            raise ValueError(f"Insufficient validation coverage for {sid}: {val}")
        choice = min(val, key=lambda m: val[m]["wape"])
        test = {m: metrics(values, HOLDOUT, m) for m in ("prior_week", "four_week_mean")}
        if any(v["coverage"] < 160 for v in test.values()):
            raise ValueError(f"Insufficient holdout coverage for {sid}: {test}")
        expected = int((last - first).total_seconds() // 3600) + 1
        missing = expected - len(values)
        summary["missing_station_hours"] += missing
        summary["stations"][sid] = {**meta[sid], "method": choice, "validation": val,
                                    "holdout": test, "records": len(values), "missing_hours": missing,
                                    "total_entrances": round(sum(values.values()))}
        for i in range(168):
            test_hour = HOLDOUT + dt.timedelta(hours=i)
            if test_hour in values:
                holdout.append({"station_id": sid, "hour": test_hour.isoformat(),
                                "actual": round(values[test_hour]),
                                "chosen_forecast": round(predict(values, HOLDOUT, choice, test_hour)),
                                "prior_week_forecast": round(predict(values, HOLDOUT, "prior_week", test_hour))})
            future_hour = FUTURE + dt.timedelta(hours=i)
            estimate = predict(values, FUTURE, choice, future_hour)
            if estimate is None:
                raise ValueError(f"Cannot forecast {sid} at {future_hour}")
            forecasts.append({"station_id": sid, "hour": future_hour.isoformat(),
                              "forecast_entrances": round(estimate), "method": choice})
    (ROOT / "results.json").write_text(json.dumps(summary, indent=2) + "\n")
    for filename, records in (("holdout_predictions.csv", holdout), ("next_week_forecast.csv", forecasts)):
        with (ROOT / filename).open("w", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=list(records[0]))
            writer.writeheader()
            writer.writerows(records)
    payload = {"summary": summary,
               "actuals": [[sid, hour.strftime("%Y-%m-%dT%H:%M"), round(value)]
                           for sid, values in series.items() for hour, value in sorted(values.items())],
               "forecast": [[row["station_id"], row["hour"][:16], row["forecast_entrances"]] for row in forecasts],
               "holdout": [[row["station_id"], row["hour"][:16], row["actual"], row["chosen_forecast"]] for row in holdout]}
    template = (ROOT / "dashboard.template.html").read_text()
    (ROOT / "index.html").write_text(template.replace("__PROJECT_DATA__", json.dumps(payload, separators=(",", ":")).replace("<", "\\u003c")))
    print("Wrote index.html, next_week_forecast.csv, holdout_predictions.csv, results.json")
    for sid, info in summary["stations"].items():
        print(f'{info["name"]}: {info["method"]}, holdout WAPE {info["holdout"][info["method"]]["wape"]}% vs prior-week {info["holdout"]["prior_week"]["wape"]}%; {info["missing_hours"]} missing hours')


if __name__ == "__main__":
    main()
