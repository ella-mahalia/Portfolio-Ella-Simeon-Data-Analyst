# Airline Route Demand & Capacity Forecast

**Ella Simeon · Independent portfolio project · Public airline traffic data**

[Open the dashboard](dashboard.html) by double-clicking `dashboard.html` after unzipping. It is self-contained and works offline. Use the route menu to compare actuals, forecasts, 2025 backtest error, and a four-month seat planning scenario.

## Business question

Across six JetBlue-operated nonstop routes, what passenger volumes might occur in May–August 2026, and where might prior-year seat supply deserve review? This is an independent analysis of public records, **not work performed for or endorsed by JetBlue**.

## Data and lineage

The project uses BTS T-100 scheduled passenger segment data (service class F) for domestic **directional nonstop segments**, 2022–April 2026. The input is a monthly processed extract from [T100 Route Explorer's gold-2026-04 release](https://github.com/Tfields/t100-route-explorer/releases/tag/gold-2026-04), itself derived from [BTS T-100 segment records](https://www.bts.gov/browse-statistical-products-and-data/bts-publications/data-bank-28ds-t-100-domestic-segment-data-us). The supplied `route_monthly_actuals.csv` has 312 monthly observations for six routes and contains only month, route, carried passengers, seats, departures, and observed passenger-to-seat ratio. Source data is public; it contains no customer records or fares.

The six preselected directional segments are JFK–LAX, JFK–MCO, JFK–FLL, BOS–MCO, BOS–DCA, and BOS–LAX. Direction matters: JFK–LAX is different from LAX–JFK. **Passengers carried can be limited by seats supplied, so this is a traffic forecast, not an estimate of unconstrained demand.**

## Forecast design

- Training history: 2022–2023 for a **2024 validation year**. Select the lower-WAPE approach for each route without looking at 2025 results.
- Candidate 1: same-month prior-year passengers (seasonal naive).
- Candidate 2: same-month prior-year passengers multiplied by the prior calendar year's growth, clipped to 0.80–1.20 (seasonal growth).
- Evaluate the selected method on **2025 holdout months**. WAPE = sum absolute errors / sum actual passengers. Also report the 2025 seasonal-naive baseline.
- Produce May–August 2026 forecasts from the same months in 2025, using a rolling May 2025–April 2026 versus May 2024–April 2025 factor for growth-selected routes. This uses the available 2026 months only after the backtest.
- Scenarios of ± route-specific 2025 WAPE are sensitivity bounds, **not statistical prediction intervals**.

| Route | Selected model | 2025 WAPE | Naive baseline WAPE | May–Aug 2026 forecast |
| --- | --- | ---: | ---: | ---: |
| BOS–DCA | Seasonal growth | 25.3% | 30.8% | 64,155 |
| BOS–LAX | Seasonal naive | 11.5% | 11.5% | 93,501 |
| BOS–MCO | Seasonal naive | 7.9% | 7.9% | 94,675 |
| JFK–FLL | Seasonal growth | 6.4% | 10.4% | 92,399 |
| JFK–LAX | Seasonal naive | 3.6% | 3.6% | 154,731 |
| JFK–MCO | Seasonal growth | 10.5% | 9.4% | 126,678 |

The selected method does not always beat the baseline in the 2025 holdout (JFK–MCO is an example). BOS–DCA has particularly high error and should not drive a firm capacity recommendation.

## Capacity scenario and recommendation

For each future month, calculate **forecast passengers / 0.85**, round up to whole seats, then subtract the **same month in 2025** available seats. The 85% target is a clearly labeled illustrative benchmark, not JetBlue's target. The prior-year seat count is a comparison reference, **not the actual 2026 schedule**.

Across four months, BOS–LAX shows a combined positive gap of roughly **4,165 seats** against this reference. The action is to **review** current schedules, yield, competition, booking pace, and route profitability before any change. Other routes do not show positive aggregate gaps under these assumptions. A negative gap is not a recommendation to remove seats. No ticket revenue or route profit can be calculated from this dataset.

## Reproduce

With Python, pandas, numpy, and pyarrow installed:

```bash
python3 build_project.py
python3 make_dashboard.py
```

The included monthly CSV is sufficient to reproduce all results. To rebuild from the full public-derived release, download `route_carrier_month.parquet` from the linked release and run `python3 build_project.py /path/to/route_carrier_month.parquet`. The large full release is not included in this project package.

## Contents

- `dashboard.html`: interactive offline dashboard.
- `route_monthly_actuals.csv`: project input, 312 route-month records.
- `capacity_scenarios.csv`: future forecast and comparison calculations.
- `backtest_scores.csv`, `holdout_predictions.csv`: validation and test evidence.
- `results.json`: results for display.
- `build_project.py`, `make_dashboard.py`: reproducible pipeline.
- `power_bi_guide.md`: instructions to make a native Power BI report.

### Portfolio card copy

**Airline Route Demand & Capacity Forecast** — Forecasted route-level passenger traffic using public BTS data, backtested seasonal methods against a 2025 holdout year, and built a capacity planning dashboard for six nonstop routes. **Python · Forecasting · Power BI · Transportation Analytics**.
