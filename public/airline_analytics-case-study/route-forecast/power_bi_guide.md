# Power BI report guide

This package includes a working HTML dashboard and the CSVs for a native Power BI report. It does **not** contain a `.pbix` file.

1. Get data → Text/CSV → `route_monthly_actuals.csv` (name it `Actuals`) and `capacity_scenarios.csv` (name it `Forecast`). Set month fields to Date and counts to Whole Number.
2. Make a `Route` dimension with the distinct route names. Relate it one-to-many to both tables by `route`; use the Route dimension as the slicer. Leave actual and forecast tables unrelated to each other.
3. Measures for the actuals table:

```DAX
Passengers = SUM(Actuals[passengers])
Seats = SUM(Actuals[seats])
Flights = SUM(Actuals[departures])
Observed Load Factor = DIVIDE([Passengers], [Seats])
```

4. Measures for the forecast table:

```DAX
Forecast Passengers = SUM(Forecast[forecast_passengers])
Reference Seats = SUM(Forecast[prior_year_seats])
Seats at 85 Percent = SUM(Forecast[seats_at_85pct])
Seat Gap = [Seats at 85 Percent] - [Reference Seats]
Implied Load Factor = DIVIDE([Forecast Passengers], [Reference Seats])
```

5. Suggested visuals: route slicer; cards for four-month forecast, 2025 WAPE (from `backtest_scores.csv`), seat gap, and latest actual month; line chart of Actuals passenger counts by month; column chart of Forecast passengers by future month; Matrix with route, forecast passengers, reference seats, and gap. Use separate visuals for actuals and forecasts, or append them in Power Query into a common chart table with a clear Actual/Forecast column.
6. Put this note on the report: **Independent portfolio study of public BTS T-100 data. 85% load factor is an illustrative assumption; 2025 seats are a comparison reference, not a 2026 plan.**

Format Observed Load Factor and Implied Load Factor as Percentage with one decimal. Do not average the CSV's monthly load-factor column across periods; calculate `SUM(passengers) / SUM(seats)` using the measure above.
