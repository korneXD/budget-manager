"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { curveCardinal } from "d3-shape";

export const BudgetDiagram = ({ transactions, categories, currency }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");

  const COLORS = [
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d", // greens
    "#f87171",
    "#ef4444",
    "#dc2626",
    "#b91c1c", // reds
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8", // blues
  ];

  useEffect(() => {
    if (!transactions || !categories) return;

    const incomeTransactions = transactions.filter((t) => t.type === "Bevétel");
    const expenseTransactions = transactions.filter(
      (t) => t.type !== "Bevétel",
    );

    const incomeByCategory = {};
    const expenseByCategory = {};

    incomeTransactions.forEach((transaction) => {
      const category =
        categories.find((c) => c.id === transaction.categId)?.name || "Egyéb";
      if (!incomeByCategory[category]) {
        incomeByCategory[category] = 0;
      }
      incomeByCategory[category] += Number.parseFloat(transaction.amount);
    });

    expenseTransactions.forEach((transaction) => {
      const category =
        categories.find((c) => c.id === transaction.categId)?.name || "Egyéb";
      if (!expenseByCategory[category]) {
        expenseByCategory[category] = 0;
      }
      expenseByCategory[category] += Number.parseFloat(transaction.amount);
    });

    const incomeChartData = Object.keys(incomeByCategory).map((category) => ({
      name: category,
      value: incomeByCategory[category],
    }));

    const expenseChartData = Object.keys(expenseByCategory).map((category) => ({
      name: category,
      value: expenseByCategory[category],
    }));

    const totalIncome = incomeChartData.reduce(
      (sum, item) => sum + item.value,
      0,
    );
    const totalExpense = expenseChartData.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    const summaryChartData = [
      { name: "Bevétel", value: totalIncome },
      { name: "Kiadás", value: totalExpense },
    ];

    setIncomeData(incomeChartData);
    setExpenseData(expenseChartData);
    setSummaryData(summaryChartData);
  }, [transactions, categories]);

  const formatAmount = (amount) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const cardinal = curveCardinal.tension(0.2);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2000,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ];
  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-sky-950 bg-black/30 shadow-md backdrop-blur-sm">
      <div className="border-b border-sky-950 p-4">
        <h2 className="font-nohemiLight text-2xl text-white">
          Költségvetés Áttekintés
        </h2>
        <p className="font-nohemiLight text-gray-300">
          Bevételek és kiadások megoszlása
        </p>
      </div>

      <div className="p-4">
        {/* Custom Tabs */}
        <div className="mb-4 flex space-x-1 rounded-lg bg-black/20 p-1">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 rounded-md px-3 py-2 transition-colors ${
              activeTab === "summary"
                ? "bg-sky-950 font-nohemi text-sky-400 shadow-sm"
                : "font-nohemiLight hover:bg-sky-950/80"
            }`}
          >
            Összesítés
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`flex-1 rounded-md px-3 py-2 transition-colors ${
              activeTab === "income"
                ? "bg-sky-950 font-nohemi text-sky-400 shadow-sm"
                : "font-nohemiLight hover:bg-sky-950/80"
            }`}
          >
            Bevételek
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`flex-1 rounded-md px-3 py-2 transition-colors ${
              activeTab === "expenses"
                ? "bg-sky-950 font-nohemi text-sky-400 shadow-sm"
                : "font-nohemiLight hover:bg-sky-950/80"
            }`}
          >
            Kiadások
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {/* Summary Tab */}
          {activeTab === "summary" && (
            <div>
              <div className="h-80 font-nohemiLight">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={summaryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="value">
                      {summaryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? "oklch(62.7% 0.194 149.214)"
                              : "oklch(57.7% 0.245 27.325)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-600/50 p-4">
                  <h3 className="font-nohemiLight text-lg text-white">
                    Összes bevétel
                  </h3>
                  <p className="font-nohemi text-xl tracking-wide text-white">
                    {formatAmount(summaryData[0]?.value || 0)}
                  </p>
                </div>
                <div className="rounded-lg bg-red-600/50 p-4">
                  <h3 className="font-nohemiLight text-lg text-white">
                    Összes kiadás
                  </h3>
                  <p className="font-nohemi text-xl tracking-wide text-white">
                    {formatAmount(summaryData[1]?.value || 0)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Income Tab */}
          {activeTab === "income" && (
            <div className="h-80 font-nohemiLight">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Area
                    type={cardinal}
                    dataKey="uv"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === "expenses" && (
            <div className="h-80 font-nohemiLight">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[(index % COLORS.length) + 4]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
