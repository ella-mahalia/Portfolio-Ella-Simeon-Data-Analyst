"""Fetch reproducible station-hourly entrance estimates from NY Open Data.

Usage: python fetch_data.py
Data: MTA Subway Hourly Ridership: Beginning 2025 (5wq4-mkjj).
"""
from __future__ import annotations

import csv
import datetime as dt
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parent
API = "https://data.ny.gov/resource/5wq4-mkjj.json"
STATIONS = {"611": "Times Sq–42 St / Port Authority", "610": "Grand Central–42 St", "607": "34 St–Herald Sq", "616": "Jackson Hts–Roosevelt Av / 74 St", "447": "Flushing–Main St"}
START = dt.datetime(2026, 6, 1)
END = dt.datetime(2026, 9, 17)  # exclusive; latest complete timestamp Sep 16, 23:00
FIELDS = ["transit_timestamp", "station_complex_id", "station_complex", "borough", "ridership"]


def fetch_chunk(start: dt.datetime, end: dt.datetime) -> list[dict]:
    ids = ",".join("'" + x + "'" for x in STATIONS)
    params = {
        "$select": "transit_timestamp,station_complex_id,max(station_complex) as station_complex,max(borough) as borough,sum(ridership) as ridership",
        "$where": f"transit_timestamp >= '{start:%Y-%m-%dT%H:%M:%S}' and transit_timestamp < '{end:%Y-%m-%dT%H:%M:%S}' and station_complex_id in ({ids}) and transit_mode='subway'",
        "$group": "transit_timestamp,station_complex_id",
        "$order": "transit_timestamp,station_complex_id",
        "$limit": "50000",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "EllaSimeonPortfolioResearch/1.0"})
            with urllib.request.urlopen(req, timeout=100) as response:
                data = json.load(response)
            expected = (end - start).days * 24 * len(STATIONS)
            if len(data) > expected:
                raise ValueError(f"Unexpected number of rows: {len(data)} > {expected}")
            print(f"{start:%Y-%m-%d} to {end:%Y-%m-%d}: {len(data)} rows", flush=True)
            return data
        except (urllib.error.URLError, TimeoutError, ValueError) as exc:
            print(f"Retry {attempt + 1} for {start:%Y-%m-%d}: {exc}", flush=True)
            if attempt == 3:
                raise
            time.sleep(2 * (attempt + 1))
    raise AssertionError("unreachable")


def main():
    chunks = []
    day = START
    while day < END:
        stop = min(day + dt.timedelta(days=7), END)
        chunks.append((day, stop))
        day = stop
    rows = []
    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(fetch_chunk, *pair): pair for pair in chunks}
        for future in as_completed(futures):
            rows.extend(future.result())
    rows.sort(key=lambda r: (r["transit_timestamp"], r["station_complex_id"]))
    if len(rows) != len({(r["transit_timestamp"], r["station_complex_id"]) for r in rows}):
        raise ValueError("Duplicate station-hour found")
    with (ROOT / "station_hourly.csv").open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows({field: r.get(field, "") for field in FIELDS} for r in rows)
    print(f"Saved {len(rows)} station-hour rows to station_hourly.csv", flush=True)


if __name__ == "__main__":
    main()
