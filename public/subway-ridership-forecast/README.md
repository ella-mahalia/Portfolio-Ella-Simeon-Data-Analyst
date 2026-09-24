# Subway Ridership Forecast & Station Trends

An independent, reproducible data science case study using **public MTA subway hourly ridership estimates**. Explore an offline interactive dashboard at [`index.html`](index.html).

## What the project answers

- When are paid entrances busiest at Times Sq / Port Authority, Grand Central, Herald Square, Jackson Heights / Roosevelt Av, and Flushing / Main St?
- How do station patterns differ across weekday, weekend, morning, and evening periods?
- How accurately can recent weekly patterns forecast the next seven days?

## Data and definitions

Source: [MTA Subway Hourly Ridership: Beginning 2025, NY Open Data](https://data.ny.gov/Transportation/MTA-Subway-Hourly-Ridership-Beginning-2025/5wq4-mkjj). Extracted September 24, 2026. Study window: June 1 through September 16, 2026, inclusive; latest complete hour included is September 16 at 11 PM (local New York time as presented by source timestamps). Five station complexes, 2,592 hours each, 12,960 station-hour rows total, zero missing hours.

The source provides estimated ridership separately by station complex, hour, fare class, and payment method. `fetch_data.py` sums `ridership` across payment methods and fare classes to produce one station-hour **estimated paid entrance** count. The results are *not* exits, unique people, train occupancy, or capacity utilization. Source and extract may be revised by the publisher; rerunning later can produce different numbers.

## Forecast and evaluation

- **Prior-week baseline:** the observed count for the same weekday and hour exactly seven days earlier.
- **Four-week mean:** average of the preceding four observations at that same weekday-hour.
- **Selection:** choose the lower WAPE for each station on August 3–9, 2026, using only data before August 3.
- **Held-out test:** forecast August 17–23 using only information available before August 17. Report this genuinely unseen one-week-ahead WAPE beside the prior-week baseline. The four-week method was chosen for all five stations on validation, but it **underperformed the prior-week baseline on the test week at Times Sq and Grand Central**. This is expected variability, not a claim of guaranteed improvement.
- **As-of snapshot forecast:** September 17–23 based strictly on data through September 16. For each target hour, both methods use only prior observed weeks. No observed future hour enters the forecast. As of the September 24 extraction, these dates have passed, but their actuals were not yet available in the dataset; this is a fixed as-of-September-16 forecast, **not a live forecast of upcoming calendar dates**.
- **WAPE:** sum of absolute hourly errors divided by sum of observed hourly entrances. Low-volume hours can have large relative errors even when aggregate WAPE is small. The dashboard shows actual versus forecast daily volume and station-level holdout WAPE; CSV has the hourly predictions.

This simple seasonal model does not include holidays, special events, weather, service changes, ridership revisions, or uncertainty intervals. Treat forecasts as planning signals, not operational staffing or service recommendations.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Self-contained, offline interactive dashboard; open in a browser or host as a static file |
| `station_hourly.csv` | Aggregated, real public station-hour entrance estimates |
| `next_week_forecast.csv` | September 17–23 hourly station forecasts |
| `holdout_predictions.csv` | August 17–23 actuals and hourly predictions, including baseline |
| `results.json` | Data cutoffs, chosen methods, completeness, validation and holdout results |
| `fetch_data.py` | Re-download public Socrata records and aggregate station-hours |
| `analyze.py` | Forecast selection, holdout and dashboard generation |
| `dashboard.template.html` | Standalone dashboard source template |
| `power_bi_guide.md` | Optional steps to rebuild this analysis in Power BI |
| `cover.png` | Square cinematic portfolio card image (1254 × 1254 PNG) |
| `cover.svg` | Alternate vector cover design |

To reproduce with Python 3.10+ (standard library only):

```bash
python fetch_data.py
python analyze.py
```

The provided files are a frozen September 24, 2026 extract and forecasts, useful for reviewing the same result. Refreshing the script requires internet access, and the script fixes the study dates; update `START`, `END`, validation, holdout, and forecast cutoffs to run a new period. A refresh may reflect data revisions.

## Add to Ella's Next.js portfolio

Copy the **whole `subway-ridership-forecast` folder** into your portfolio project's `public` folder. Add an object to the `projects` array in `app/components/Portfolio.jsx`:

```jsx
{
  id: 6,
  title: "Subway Ridership Forecast & Station Trends",
  image: "/subway-ridership-forecast/cover.png",
  tags: ["Public MTA Data", "Time Series", "Forecasting", "Python"],
  link: "/subway-ridership-forecast/index.html",
},
```

Use an unused `id` if `6` is already taken. In Next.js, paths within `public` start at `/`: **do not** put `/public/` in the link. The dashboard embeds its data, so it also works as a local HTML file. The Python and CSV files are intentionally public when placed under `public`; they contain only shareable public-source data and calculations.

Independent portfolio research, not a product or official forecast of the MTA.
