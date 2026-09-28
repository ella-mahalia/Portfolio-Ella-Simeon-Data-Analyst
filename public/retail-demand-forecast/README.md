# Retail Demand Forecasting & Store Performance

This folder is designed to go directly inside your Next.js portfolio:

```text
public/
  retail-demand-forecast/
    index.html
    styles.css
    app.js
    data/
    src/
    sql/
    assets/
```

Your Portfolio.jsx card can use:

```jsx
{
  id: 3,
  title: "Retail Demand Forecasting & Store Performance",
  image: "/assets/retail-demand-cover.png",
  imagePosition: "center 30%",
  tags: [
    "Time Series",
    "Forecasting",
    "Python",
    "SQL",
    "Data Visualization",
  ],
  link: "/retail-demand-forecast/index.html",
}
```

## Important: preview vs real analysis

The included `data/dashboard-data.js` starts in `demo` mode so the full website can be previewed immediately.

To populate it with your real Walmart results:

1. Create:

```text
data/raw/
```

2. Put these Kaggle files there:

```text
train.csv
stores.csv
features.csv
```

3. Install:

```bash
pip install pandas numpy
```

4. Run:

```bash
python src/build_dashboard_data.py
```

That overwrites `data/dashboard-data.js` with calculated KPI and chart data and hides the demo note automatically.

## Dataset

Walmart Recruiting – Store Sales Forecasting.

Historical `train.csv` contains:
- Store
- Dept
- Date
- Weekly_Sales
- IsHoliday

`stores.csv` contains store type and size.

`features.csv` adds:
- Temperature
- Fuel_Price
- MarkDown1–5
- CPI
- Unemployment
- IsHoliday

## Portfolio focus

The page demonstrates:

- data integration
- descriptive analytics
- store / department analysis
- seasonality
- holiday analysis
- SQL
- time-series feature engineering
- chronological model evaluation
- baseline forecasting
- demand-risk interpretation

The site intentionally calls the operational output **Demand Risk**, not inventory shortage, because the public dataset does not contain actual stock-on-hand.
