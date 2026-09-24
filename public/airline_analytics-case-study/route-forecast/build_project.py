"""BTS T-100 route-level forecast portfolio case. Re-run with source parquet as input."""
from pathlib import Path
import pandas as pd
import numpy as np
import json
import sys

ROOT=Path(__file__).parent
SOURCE=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'route_carrier_month.parquet'
ROUTES=['JFK-LAX','JFK-MCO','JFK-FLL','BOS-MCO','BOS-DCA','BOS-LAX']
TARGET=0.85  # Illustrative planning benchmark, not an airline policy.
if SOURCE.exists():
    raw=pd.read_parquet(SOURCE,filters=[('carrier','=','B6')])
    raw['flight_month']=pd.to_datetime(raw.flight_month)
    raw['route']=raw.origin+'-'+raw.dest
    raw=raw[raw.route.isin(ROUTES)&raw.flight_month.between('2022-01-01','2026-04-01')]
    raw=raw[(raw.origin_country=='United States')&(raw.dest_country=='United States')]
    monthly=raw.groupby(['route','flight_month'],as_index=False)[['passengers','seats','departures']].sum().sort_values(['route','flight_month'])
else:
    monthly=pd.read_csv(ROOT/'route_monthly_actuals.csv',parse_dates=['flight_month'])
    monthly=monthly[['route','flight_month','passengers','seats','departures']].sort_values(['route','flight_month'])
monthly['load_factor']=monthly.passengers/monthly.seats
assert len(monthly)==len(ROUTES)*52,monthly.groupby('route').size()
assert (monthly.passengers<=monthly.seats).all()
monthly.to_csv(ROOT/'route_monthly_actuals.csv',index=False,date_format='%Y-%m-%d')

def prediction(y,year,month,method,cutoff=None):
    ref=pd.Timestamp(year-1,month,1)
    base=float(y.loc[ref])
    if method=='Seasonal naive':return base
    # Full prior calendar years for the historical backtests.
    a=y.loc[f'{year-1}-01-01':f'{year-1}-12-01'].sum()
    b=y.loc[f'{year-2}-01-01':f'{year-2}-12-01'].sum()
    factor=float(np.clip(a/b,0.8,1.2))
    return base*factor

scores=[];future=[];holdout=[]
for route,g in monthly.groupby('route'):
    y=g.set_index('flight_month').passengers
    validation={}
    for method in ['Seasonal naive','Seasonal growth']:
        pred=np.array([prediction(y,2024,m,method) for m in range(1,13)])
        actual=np.array([y.loc[pd.Timestamp(2024,m,1)] for m in range(1,13)])
        validation[method]=float(np.abs(actual-pred).sum()/actual.sum())
    method=min(validation,key=validation.get)
    baseline=np.array([prediction(y,2025,m,'Seasonal naive') for m in range(1,13)])
    model=np.array([prediction(y,2025,m,method) for m in range(1,13)])
    actual=np.array([y.loc[pd.Timestamp(2025,m,1)] for m in range(1,13)])
    wape=float(np.abs(actual-model).sum()/actual.sum())
    baseline_wape=float(np.abs(actual-baseline).sum()/actual.sum())
    scores.append({'route':route,'selected_method':method,'validation_2024_wape':round(validation[method],4),'holdout_2025_wape':round(wape,4),'holdout_2025_baseline_wape':round(baseline_wape,4),'holdout_2025_bias_pct':round(float((model-actual).sum()/actual.sum()),4)})
    for m in range(1,13):
        holdout.append({'route':route,'month':f'2025-{m:02d}-01','actual':int(actual[m-1]),'forecast':round(float(model[m-1])),'baseline':round(float(baseline[m-1]))})
    # May-Aug 2026: same month of 2025, with a recent 12-month growth factor.
    recent=y.loc['2025-05-01':'2026-04-01'].sum()
    previous=y.loc['2024-05-01':'2025-04-01'].sum()
    factor=float(np.clip(recent/previous,0.8,1.2))
    for m in range(5,9):
        month=f'2026-{m:02d}-01'
        p=float(y.loc[pd.Timestamp(2025,m,1)])*(factor if method=='Seasonal growth' else 1)
        prior=g.loc[g.flight_month==pd.Timestamp(2025,m,1)].iloc[0]
        # Holding last year's seats as a reference scenario, not claiming 2026 schedule.
        required=np.ceil(p/TARGET)
        gap=int(required-prior.seats)
        scenario='Review additional capacity' if gap>0 else 'Current reference capacity may suffice'
        future.append({'route':route,'month':month,'forecast_passengers':round(p),'scenario_low':round(p*(1-wape)),'scenario_high':round(p*(1+wape)),'prior_year_seats':int(prior.seats),'seats_at_85pct':int(required),'seat_gap_vs_prior_year':gap,'implied_load_factor_if_prior_seats':round(p/prior.seats,4),'planning_flag':scenario,'selected_method':method})
pd.DataFrame(scores).to_csv(ROOT/'backtest_scores.csv',index=False)
pd.DataFrame(holdout).to_csv(ROOT/'holdout_predictions.csv',index=False)
pd.DataFrame(future).to_csv(ROOT/'capacity_scenarios.csv',index=False)
summary={'source':'BTS T-100 scheduled passenger segment data, processed in Tfields/t100-route-explorer gold-2026-04 release','latest_actual':'2026-04','routes':ROUTES,'target_load_factor_assumption':TARGET,'scores':scores,'future':future}
(ROOT/'results.json').write_text(json.dumps(summary,indent=2))
print(pd.DataFrame(scores).to_string(index=False))
print(pd.DataFrame(future).groupby('route').agg({'forecast_passengers':'sum','seat_gap_vs_prior_year':'sum'}).to_string())
