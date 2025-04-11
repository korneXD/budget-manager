"use client";

import { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../context/UserContext";
import { Context } from "../context/Context";

export const BudgetDiagram = ({ transactions, categories, currency }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");

  const { user } = useContext(UserContext);
  const { targets } = useContext(Context);

  const [userTargets, setUserTargets] = useState([]);

  useEffect(() => {
    setUserTargets([]);
    targets?.map((e) => {
      if (e.userId == user?.uid) {
        setUserTargets((prev) => [...prev, e]);
      }
    });
  }, [targets]);

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

  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-sky-950 bg-black/30 shadow-md backdrop-blur-sm md:max-w-3xl">
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
        <div className="mb-4 flex flex-col space-x-1 rounded-lg bg-black/20 p-1 md:flex-row">
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
            Célok
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
            <div className="flex min-h-80 w-full flex-col items-center justify-start gap-2 font-nohemiLight">
              {userTargets &&
                userTargets.map((e) => (
                  <div
                    className={
                      (e.progress / e.amount) * 100 == 100
                        ? "flex h-fit w-full flex-col items-center justify-start gap-4 rounded-xl border-2 border-sky-950 bg-green-900 px-2 py-4 shadow-md md:max-w-2xl md:flex-row"
                        : "flex h-fit w-full max-w-2xl flex-col items-center justify-start gap-4 rounded-xl border-2 border-sky-950 bg-sky-900 px-2 py-4 shadow-md md:flex-row"
                    }
                  >
                    <p className="w-full max-w-[150px] truncate text-center text-xl text-sky-200 md:text-left">
                      {e.name}
                    </p>
                    <progress
                      value={(e.progress / e.amount) * 100}
                      max={100}
                      className="h-5 overflow-hidden rounded-xl border-2 border-sky-950"
                    />
                    <p>{(e.progress / e.amount) * 100}%</p>
                    {(() => {
                      const percent = (e.progress / e.amount) * 100;

                      if (percent >= 100) {
                        return <p>Gratulálok! Elérted a célod!</p>;
                      } else if (percent >= 90) {
                        return <p>Ez a 10% már nem foghat ki rajtad...</p>;
                      } else if (percent >= 75) {
                        return <p>Már közel jársz hozzá!</p>;
                      } else if (percent >= 50) {
                        return <p>Már megvan több mint a fele!</p>;
                      } else if (percent >= 25) {
                        return <p>Nemsokára megvan a fele!</p>;
                      } else if (percent < 25) {
                        return <p>Ne add fel, még csak most kezdted!</p>;
                      } else {
                        return null;
                      }
                    })()}
                  </div>
                ))}
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === "expenses" && (
            <div className="h-80 font-nohemiLight"></div>
          )}
        </div>
      </div>
    </div>
  );
};
