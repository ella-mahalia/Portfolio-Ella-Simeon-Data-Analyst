# Power BI dashboard build guide

1. In Power BI Desktop, select **Get data → Text/CSV** and import `booking_sessions.csv`. Name the table `Bookings`.
2. Set `session_date` to Date; the three funnel flags to Whole number; and `booking_revenue` to Decimal number/Currency. Check `session_id` is Text.
3. Create these measures under `Bookings`:

```DAX
Sessions = DISTINCTCOUNT(Bookings[session_id])
Bookings Completed = SUM(Bookings[booking_completed])
Flight Selections = SUM(Bookings[flight_selected])
Checkout Starts = SUM(Bookings[checkout_started])
Booking Revenue = SUM(Bookings[booking_revenue])
Booking Conversion = DIVIDE([Bookings Completed], [Sessions])
Revenue per Session = DIVIDE([Booking Revenue], [Sessions])
```

For cards comparing variants, create separate measures:

```DAX
Control Sessions = CALCULATE([Sessions], Bookings[variant] = "Control")
Treatment Sessions = CALCULATE([Sessions], Bookings[variant] = "Treatment")
Control Bookings = CALCULATE([Bookings Completed], Bookings[variant] = "Control")
Treatment Bookings = CALCULATE([Bookings Completed], Bookings[variant] = "Treatment")
Control Conversion = DIVIDE([Control Bookings], [Control Sessions])
Treatment Conversion = DIVIDE([Treatment Bookings], [Treatment Sessions])
Absolute Lift = [Treatment Conversion] - [Control Conversion]
Relative Lift = DIVIDE([Treatment Conversion], [Control Conversion]) - 1
```

Format conversion and lifts as Percent with two decimal places. `Absolute Lift` displays as a percent (e.g. 0.49%); describe that number in accompanying text as **0.49 percentage points**. Do not interpret percentage points as relative percent lift.

## Suggested report page

- Heading: **Flight Search Experiment | Simulated Data** and a visible subtitle **Portfolio case study; no JetBlue customer data**.
- KPI cards: Total Sessions, Control Conversion, Treatment Conversion, Relative Lift.
- Clustered bar: `variant` on legend with `Sessions`, `Flight Selections`, `Checkout Starts`, and `Bookings Completed` via a separate unpivoted funnel table if desired, or four small grouped bar charts. For a simpler report, use a Matrix with `variant` rows and the four measures as values.
- Line chart: `session_date` on X, `Booking Conversion` on Y, `variant` as legend. Interpret daily variation cautiously.
- Matrix: `device` rows, `variant` columns, Sessions, Bookings Completed, and Booking Conversion values.
- Slicers: `device`, `channel`, `route_type`. Avoid using `variant` as a global slicer, since the two arm comparison needs both variants.
- Decision box: **Observed uplift is inconclusive: p = 0.172, 95% CI −0.21 to +1.20 percentage points** for the unfiltered full sample. These fixed statistics should NOT be presented as dynamically recalculated when slicers are used. For dynamic inference, use the companion HTML dashboard or add a validated statistics calculation.

The companion HTML dashboard is a working interactive view; this guide supplies the Power BI implementation. No `.pbix` file is included.
