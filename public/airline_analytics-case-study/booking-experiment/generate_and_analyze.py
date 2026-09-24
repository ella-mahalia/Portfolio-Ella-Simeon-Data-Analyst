"""Generate simulated airline booking sessions and analyze an A/B test."""
from pathlib import Path
import csv
import json
import math
import random
from datetime import date, timedelta
from statistics import NormalDist

ROOT = Path(__file__).parent
RNG = random.Random(20260924)
N_PER_ARM = 12000
START = date(2026, 5, 1)
CHANNELS = ("Direct", "Organic Search", "Paid Search", "Email")
DEVICES = ("Mobile", "Desktop", "Tablet")
ROUTES = ("Domestic", "Caribbean", "International")

def weighted(options, weights):
    return RNG.choices(options, weights=weights, k=1)[0]

rows = []
for i in range(2 * N_PER_ARM):
    group = "Control" if i % 2 == 0 else "Treatment"
    day = START + timedelta(days=RNG.randrange(28))
    channel = weighted(CHANNELS, [38, 30, 22, 10])
    device = weighted(DEVICES, [61, 34, 5])
    route = weighted(ROUTES, [68, 22, 10])
    selected = RNG.random() < (0.565 if group == "Treatment" else 0.55)
    checkout = selected and RNG.random() < (0.56 if group == "Treatment" else 0.55)
    booking = checkout and RNG.random() < (0.29 if group == "Treatment" else 0.27)
    fare = round(RNG.uniform(145, 470) * (1.18 if route == "International" else 1), 2) if booking else 0
    rows.append({
        "session_id": f"S{i+1:06d}", "session_date": day.isoformat(), "variant": group,
        "device": device, "channel": channel, "route_type": route,
        "flight_selected": int(selected), "checkout_started": int(checkout),
        "booking_completed": int(booking), "booking_revenue": fare,
    })

fields = list(rows[0])
with (ROOT / "booking_sessions.csv").open("w", newline="") as f:
    writer = csv.DictWriter(f, fields)
    writer.writeheader()
    writer.writerows(rows)

def metric(subset):
    n = len(subset)
    return {
        "sessions": n,
        "selected": sum(r["flight_selected"] for r in subset),
        "checkout": sum(r["checkout_started"] for r in subset),
        "bookings": sum(r["booking_completed"] for r in subset),
        "revenue": round(sum(r["booking_revenue"] for r in subset), 2),
    }

groups = {v: metric([r for r in rows if r["variant"] == v]) for v in ("Control", "Treatment")}
p0 = groups["Control"]["bookings"] / N_PER_ARM
p1 = groups["Treatment"]["bookings"] / N_PER_ARM
pooled = (groups["Control"]["bookings"] + groups["Treatment"]["bookings"]) / (2 * N_PER_ARM)
se_null = math.sqrt(pooled * (1 - pooled) * 2 / N_PER_ARM)
z = (p1 - p0) / se_null
p_value = 2 * (1 - NormalDist().cdf(abs(z)))
se_ci = math.sqrt(p0 * (1-p0) / N_PER_ARM + p1 * (1-p1) / N_PER_ARM)
ci = [(p1-p0) - 1.96*se_ci, (p1-p0) + 1.96*se_ci]
summary = {
    "source": "SIMULATED DATA — illustrative portfolio case; no JetBlue customer data",
    "experiment": "Redesigned flight selection experience",
    "primary_metric": "Booking completed / assigned session",
    "arms": groups,
    "absolute_lift": round(p1-p0, 6), "relative_lift": round(p1/p0-1, 6),
    "z_statistic": round(z, 4), "two_sided_p_value": round(p_value, 6),
    "difference_95pct_ci": [round(x, 6) for x in ci],
    "significant_at_5pct": p_value < .05,
    "interpretation": "Illustrative only. Do not claim a real JetBlue result."
}
(ROOT / "summary.json").write_text(json.dumps(summary, indent=2))
print(json.dumps(summary, indent=2))
