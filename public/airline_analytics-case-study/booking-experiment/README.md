# Airline Booking A/B Test & Conversion Funnel

**Portfolio case study by Ella Simeon.** This is a hypothetical airline booking experiment using simulated data. It is not a JetBlue experiment and contains no JetBlue data. The airline context is intended to demonstrate methods relevant to airline analytics.

## Business question
Would a clearer flight selection interface increase the share of sessions that complete a booking? Sessions are randomly assigned to Control (current experience) or Treatment (redesigned experience). The primary metric is **completed bookings / assigned sessions**, with the session as the unit of analysis.

## Open the interactive dashboard
Double click `dashboard.html`. No installation or internet connection is required. Filter by device, acquisition channel, or route type to explore the funnel and conversion rates. The inferential result is recalculated for the selected rows; filtered comparisons are exploratory and should not be treated as confirmed subgroup effects.

## Results from the simulated sample

| Measure | Control | Treatment |
| --- | ---: | ---: |
| Sessions | 12,000 | 12,000 |
| Flight selections | 6,554 | 6,924 |
| Checkout starts | 3,649 | 3,853 |
| Completed bookings | 988 | 1,047 |
| Booking conversion | 8.23% | 8.73% |

Treatment shows **+0.49 percentage points** absolute conversion and **+5.97%** relative lift. A two sided proportion z test gives **p = 0.172**, with a 95% confidence interval for the absolute difference of **−0.21 to +1.20 percentage points**. The result is inconclusive at a 5% threshold. The appropriate recommendation is **do not claim an improvement**; collect more evidence and monitor revenue per session, checkout abandonment, and device specific usability before considering a rollout. Revenue in this dataset is synthetic and is not an airline performance claim.

## Files

- `dashboard.html` — self-contained, interactive dashboard.
- `booking_sessions.csv` — 24,000 synthetic session records ready for Power BI.
- `summary.json` — counts, conversion lift, confidence interval, and p value.
- `generate_and_analyze.py` — deterministic generator and statistical analysis (Python standard library only).
- `build_dashboard.py` — rebuilds the dashboard from the CSV (Python standard library only).
- `power_bi_guide.md` — import, DAX measures, and a report layout.

To reproduce: `python3 generate_and_analyze.py` and `python3 build_dashboard.py`.

## Method and limitations

The Python generator uses a fixed random seed and equal alternating arm assignment for a reproducible illustrative sample. It models selection, checkout, and booking in sequence, then assigns hypothetical revenue to booked sessions. The analysis compares two proportions using a two sided pooled z test and an unpooled Wald confidence interval. A real experiment would require independent randomization checks, event instrumentation validation, pre specified sample size and stopping rules, guardrail metrics, and review of revenue and customer experience. This synthetic dataset cannot establish a real business impact.
