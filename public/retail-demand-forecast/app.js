const data = window.DASHBOARD_DATA || {};

const fmtMoney = (v) =>
  v == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(v);

const fmtPct = (v) =>
  v == null || Number.isNaN(Number(v))
    ? "—"
    : `${Number(v).toFixed(1)}%`;

const storeFilter = document.querySelector("#view-filter");
const yearFilter = document.querySelector("#period-filter");

function currentView() {
  // New real-data format
  if (data.views) {
    const store = storeFilter?.value || "all";
    const year = yearFilter?.value || "all";
    return (
      data.views[`${store}|${year}`] ||
      data.views["all|all"]
    );
  }

  // Backward-compatible fallback for old dashboard-data.js
  return data;
}

function setKPIs(view) {
  const k = view.kpis || {};

  document.querySelector("#kpi-total-sales").textContent =
    fmtMoney(k.total_sales);

  document.querySelector("#kpi-average-weekly").textContent =
    fmtMoney(k.average_weekly_sales);

  document.querySelector("#kpi-stores").textContent =
    k.total_stores ?? "—";

  document.querySelector("#kpi-departments").textContent =
    k.total_departments ?? "—";

  document.querySelector("#kpi-holiday-lift").textContent =
    fmtPct(k.holiday_sales_lift_pct);
}

function lineChart(el, series, options = {}) {
  if (!el) return;

  if (!series || series.length === 0) {
    el.innerHTML = `<div style="height:100%;display:grid;place-items:center;color:#6F7F8E;font-size:.8rem">No data for this filter</div>`;
    return;
  }

  const W = 760;
  const H = 250;
  const left = 58;
  const right = 18;
  const top = 26;
  const bottom = 34;

  const values = series
    .flatMap((d) => [d.actual, d.forecast, d.value])
    .filter((v) => typeof v === "number" && Number.isFinite(v));

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const x = (i) =>
    left +
    i * ((W - left - right) / Math.max(series.length - 1, 1));

  const y = (v) =>
    H -
    bottom -
    ((v - min) / range) * (H - top - bottom);

  const actualPath = [];
  const forecastPath = [];
  const valuePath = [];

  series.forEach((d, i) => {
    if (typeof d.value === "number") {
      valuePath.push(
        `${valuePath.length ? "L" : "M"}${x(i)},${y(d.value)}`
      );
    }

    if (typeof d.actual === "number") {
      actualPath.push(
        `${actualPath.length ? "L" : "M"}${x(i)},${y(d.actual)}`
      );
    }

    if (typeof d.forecast === "number") {
      forecastPath.push(
        `${forecastPath.length ? "L" : "M"}${x(i)},${y(d.forecast)}`
      );
    }
  });

  const gridValues = [0, 0.25, 0.5, 0.75, 1].map(
    (t) => min + range * t
  );

  const grid = gridValues
    .map((v) => {
      const yy = y(v);
      return `
        <line class="axis" x1="${left}" x2="${W - right}" y1="${yy}" y2="${yy}" />
        <text x="${left - 8}" y="${yy + 4}" text-anchor="end"
              fill="${options.dark ? "#91A9BA" : "#6F7F8E"}"
              font-size="11">$${v.toFixed(1)}M</text>
      `;
    })
    .join("");

  // Date labels: first, middle, last.
  const labelIndexes = [
    0,
    Math.floor((series.length - 1) / 2),
    series.length - 1,
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  const xLabels = labelIndexes
    .map((i) => {
      const label =
        series[i].date ||
        series[i].period ||
        "";
      const text = label.length >= 10 ? label.slice(0, 7) : label;
      return `<text x="${x(i)}" y="${H - 8}" text-anchor="middle"
                    fill="${options.dark ? "#91A9BA" : "#6F7F8E"}"
                    font-size="11">${text}</text>`;
    })
    .join("");

  // Label the highest point so the chart communicates a real value without
  // covering all weekly observations in text.
  let peakLabel = "";
  if (series.some((d) => typeof d.value === "number")) {
    const vals = series.map((d) => d.value);
    const peak = Math.max(...vals);
    const i = vals.indexOf(peak);
    peakLabel = `
      <circle cx="${x(i)}" cy="${y(peak)}" r="4" fill="#F4D037" />
      <text x="${x(i)}" y="${Math.max(14, y(peak) - 10)}"
            text-anchor="middle"
            fill="${options.dark ? "#FFFFFF" : "#0F2A45"}"
            font-size="11" font-weight="700">$${peak.toFixed(1)}M</text>
    `;
  }

  // Forecast section gets point labels because there are only a few values.
  const forecastLabels = options.forecast
    ? series
        .map((d, i) => {
          if (typeof d.forecast !== "number") return "";
          return `
            <text x="${x(i)}" y="${Math.max(12, y(d.forecast) - 9)}"
              text-anchor="middle" fill="#F4D037"
              font-size="10" font-weight="700">
              $${d.forecast.toFixed(1)}M
            </text>
          `;
        })
        .join("")
    : "";

  el.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      ${grid}
      ${valuePath.length ? `<path class="line-main" d="${valuePath.join(" ")}"/>` : ""}
      ${actualPath.length ? `<path class="line-main" d="${actualPath.join(" ")}"/>` : ""}
      ${forecastPath.length ? `<path class="forecast-line" d="${forecastPath.join(" ")}"/>` : ""}
      ${peakLabel}
      ${forecastLabels}
      ${xLabels}
    </svg>
  `;
}

function renderStoreTypes(view) {
  const el = document.querySelector("#store-type-chart");
  if (!el) return;

  const rows = view.store_types || [];

  if (!rows.length) {
    el.innerHTML = `<div style="color:#6F7F8E;font-size:.8rem">No data</div>`;
    return;
  }

  const colors = ["#123B5B", "#5BA9BC", "#B7D9E9"];
  let start = 0;
  const stops = [];

  rows.forEach((d, i) => {
    const end = start + Number(d.value);
    stops.push(`${colors[i % colors.length]} ${start}% ${end}%`);
    start = end;
  });

  const totalSales = fmtMoney(view.kpis?.total_sales);

  el.innerHTML = `
    <div class="donut"
         style="background:conic-gradient(${stops.join(",")})">
      <div class="donut-label">
        <strong>${totalSales}</strong>
        <span>Total Sales</span>
      </div>
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:14px;font-size:.68rem;color:#6F7F8E">
      ${rows
        .map(
          (d, i) =>
            `<span style="display:flex;align-items:center;gap:5px">
              <i style="width:8px;height:8px;border-radius:50%;background:${colors[i % colors.length]}"></i>
              ${d.label} <b>${Number(d.value).toFixed(1)}%</b>
            </span>`
        )
        .join("")}
    </div>
  `;
}

function renderDepartments(view) {
  const el = document.querySelector("#department-chart");
  if (!el) return;

  const rows = view.top_departments || [];

  if (!rows.length) {
    el.innerHTML = `<div style="color:#6F7F8E;font-size:.8rem">No data</div>`;
    return;
  }

  el.innerHTML = rows
    .map(
      (d) => `
        <div class="bar-row">
          <span>${d.label}</span>
          <div class="bar-track">
            <i style="width:${Math.min(100, Number(d.value))}%"></i>
          </div>
          <b>$${Number(d.sales_millions ?? 0).toFixed(1)}M</b>
        </div>
      `
    )
    .join("");
}

function renderSeasonality(view) {
  const el = document.querySelector("#seasonality-chart");
  if (!el) return;

  const rows = view.monthly_seasonality || [];

  if (!rows.length) {
    el.innerHTML = `<div style="color:#6F7F8E;font-size:.8rem">No data</div>`;
    return;
  }

  const max = Math.max(...rows.map((d) => Number(d.value)), 1);

  el.innerHTML = rows
    .map(
      (d) => `
        <div class="mini-col">
          <b style="font-size:.58rem;color:#0F2A45">
            $${Number(d.value).toFixed(1)}M
          </b>
          <i style="height:${Math.max(
            12,
            (Number(d.value) / max) * 150
          )}px"></i>
          <span>${d.label}</span>
        </div>
      `
    )
    .join("");
}

function renderHolidayComparison(view) {
  const el = document.querySelector("#holiday-comparison-chart");
  if (!el) return;

  const h = view.holiday_comparison || {};
  const holiday = Number(h.holiday_avg_weekly_sales);
  const nonHoliday = Number(h.nonholiday_avg_weekly_sales);

  if (!Number.isFinite(holiday) || !Number.isFinite(nonHoliday)) {
    el.innerHTML = `<div style="height:100%;display:grid;place-items:center;color:#6F7F8E;font-size:.8rem">No holiday comparison available for this filter</div>`;
    return;
  }

  const max = Math.max(holiday, nonHoliday, 1);
  const holidayHeight = Math.max(28, (holiday / max) * 150);
  const nonHolidayHeight = Math.max(28, (nonHoliday / max) * 150);
  const lift = nonHoliday === 0 ? null : ((holiday / nonHoliday) - 1) * 100;

  el.innerHTML = `
    <div class="holiday-compare-item">
      <strong>${fmtMoney(nonHoliday)}</strong>
      <div class="holiday-compare-bar" style="height:${nonHolidayHeight}px"></div>
      <span>Non-Holiday<br/>Avg Weekly Sales</span>
    </div>
    <div class="holiday-compare-item holiday">
      <strong>${fmtMoney(holiday)}</strong>
      <div class="holiday-compare-bar" style="height:${holidayHeight}px"></div>
      <span>Holiday<br/>Avg Weekly Sales</span>
    </div>
    <div style="width:100%;flex-basis:100%">
      <div class="holiday-lift-callout">
        ${lift == null ? "Holiday lift unavailable" : `${lift >= 0 ? "+" : ""}${lift.toFixed(1)}% holiday lift`}
      </div>
    </div>
  `;
}

function renderModels() {
  const rows = data.model_comparison || [];
  const el = document.querySelector("#model-table");
  if (!el || !rows.length) return;

  const best = rows.reduce(
    (a, b) => (a.wmape < b.wmape ? a : b),
    rows[0]
  );

  el.innerHTML =
    `<div class="model-row header">
      <span>Model</span><span>WMAPE</span><span>MAE</span>
    </div>` +
    rows
      .map(
        (d) => `
          <div class="model-row ${d === best ? "best" : ""}">
            <span>${d.model}${d === best ? ' <em class="best-badge">★</em>' : ""}</span>
            <span>${Number(d.wmape).toFixed(1)}%</span>
            <span>$${Number(d.mae).toLocaleString()}</span>
          </div>
        `
      )
      .join("");
}

function renderFeatures() {
  const rows = data.feature_importance || [];
  const el = document.querySelector("#feature-chart");
  if (!el) return;

  el.innerHTML = rows
    .map(
      (d) => `
        <div class="feature-row">
          <span>
            <b>${d.label}</b>
            <small>${d.value}</small>
          </span>
          <i style="width:${d.value}%"></i>
        </div>
      `
    )
    .join("");
}

function renderRisk() {
  const rows = data.risk || [];
  const el = document.querySelector("#risk-list");
  if (!el) return;

  el.innerHTML = rows
    .map(
      (d) => `
        <div class="risk-item">
          <strong>${d.label}</strong>
          <span style="color:rgba(255,255,255,.55);font-size:.66rem">
            ${Number(d.score).toFixed(1)}% of historical baseline
          </span>
          <span class="risk-status ${d.status}">${d.status}</span>
        </div>
      `
    )
    .join("");
}

function renderOverview() {
  const view = currentView();

  setKPIs(view);

  lineChart(
    document.querySelector("#weekly-chart"),
    view.weekly_sales || []
  );

  renderStoreTypes(view);
  renderDepartments(view);
  renderSeasonality(view);
  renderHolidayComparison(view);
}

function renderForecast() {
  lineChart(
    document.querySelector("#forecast-chart"),
    data.forecast || [],
    { forecast: true, dark: true }
  );

  renderModels();
  renderFeatures();
  renderRisk();
}

function updateFilterLabels() {
  const context = document.querySelector("#filter-context-text");
  if (!context) return;

  const storeText =
    storeFilter?.selectedOptions?.[0]?.textContent || "All Stores";

  const yearText =
    yearFilter?.selectedOptions?.[0]?.textContent || "All Periods";

  context.textContent = `${storeText} · ${yearText}`;
}

function refreshDashboard() {
  renderOverview();
  updateFilterLabels();
}

storeFilter?.addEventListener("change", refreshDashboard);
yearFilter?.addEventListener("change", refreshDashboard);

document
  .querySelectorAll("[data-jump]")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector("#" + btn.dataset.jump)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

if (data.mode === "analysis") {
  const note = document.querySelector("#data-mode-note");
  if (note) note.style.display = "none";
}

refreshDashboard();
renderForecast();
