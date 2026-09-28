-- Retail Demand Forecasting & Store Performance
-- Example analytical SQL

-- Store / department contribution
SELECT
    Store,
    Dept,
    SUM(Weekly_Sales) AS Total_Sales,
    AVG(Weekly_Sales) AS Avg_Weekly_Sales,
    COUNT(DISTINCT Date) AS Weeks
FROM sales
GROUP BY Store, Dept
ORDER BY Total_Sales DESC;

-- Holiday vs non-holiday weekly sales
SELECT
    IsHoliday,
    AVG(Weekly_Sales) AS Avg_Weekly_Sales,
    SUM(Weekly_Sales) AS Total_Sales
FROM sales
GROUP BY IsHoliday;

-- Store type performance after joining store metadata
SELECT
    s.Type,
    COUNT(DISTINCT t.Store) AS Stores,
    SUM(t.Weekly_Sales) AS Total_Sales,
    AVG(t.Weekly_Sales) AS Avg_Store_Dept_Weekly_Sales
FROM sales t
JOIN stores s
  ON t.Store = s.Store
GROUP BY s.Type
ORDER BY Total_Sales DESC;
