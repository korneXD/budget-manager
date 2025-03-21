import { useState, useEffect } from "react"
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
} from "recharts"
import { CategoryDetailDiagram } from "./category-detail-diagram"

export const BudgetDiagram = ({ transactions, categories, currency }) => {
  const [incomeData, setIncomeData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [summaryData, setSummaryData] = useState([])
  const [activeTab, setActiveTab] = useState("summary")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryDetailData, setCategoryDetailData] = useState([])

  const COLORS = [
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#f87171",
    "#ef4444",
    "#dc2626",
    "#b91c1c",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
  ]

  useEffect(() => {
    if (!transactions || !categories) return

    const incomeTransactions = transactions.filter((t) => t.type === "Bevétel")
    const expenseTransactions = transactions.filter((t) => t.type !== "Bevétel")

    const incomeByCategory = {}
    const expenseByCategory = {}

    incomeTransactions.forEach((transaction) => {
      const category = categories.find((c) => c.id === transaction.categId)?.name || "Egyéb"
      if (!incomeByCategory[category]) {
        incomeByCategory[category] = 0
      }
      incomeByCategory[category] += Number.parseFloat(transaction.amount)
    })

    expenseTransactions.forEach((transaction) => {
      const category = categories.find((c) => c.id === transaction.categId)?.name || "Egyéb"
      if (!expenseByCategory[category]) {
        expenseByCategory[category] = 0
      }
      expenseByCategory[category] += Number.parseFloat(transaction.amount)
    })

    const incomeChartData = Object.keys(incomeByCategory).map((category) => ({
      name: category,
      value: incomeByCategory[category],
    }))

    const expenseChartData = Object.keys(expenseByCategory).map((category) => ({
      name: category,
      value: expenseByCategory[category],
    }))

    const totalIncome = incomeChartData.reduce((sum, item) => sum + item.value, 0)
    const totalExpense = expenseChartData.reduce((sum, item) => sum + item.value, 0)

    const summaryChartData = [
      { name: "Bevétel", value: totalIncome },
      { name: "Kiadás", value: totalExpense },
    ]

    setIncomeData(incomeChartData)
    setExpenseData(expenseChartData)
    setSummaryData(summaryChartData)
  }, [transactions, categories])

  useEffect(() => {
    if (!selectedCategory || !transactions || !categories) return
    const categoryTransactions = transactions.filter(
      (t) => categories.find((c) => c.id === t.categId)?.name === selectedCategory,
    )

    const transactionsByMonth = {}

    categoryTransactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
      const monthName = date.toLocaleString("hu-HU", { month: "short" })

      if (!transactionsByMonth[monthKey]) {
        transactionsByMonth[monthKey] = {
          name: monthName,
          value: 0,
        }
      }

      transactionsByMonth[monthKey].value += Number.parseFloat(transaction.amount)
    })

    const monthlyData = Object.values(transactionsByMonth).sort((a, b) => {
      const monthA = new Date(a.name + " 1, 2000").getMonth()
      const monthB = new Date(b.name + " 1, 2000").getMonth()
      return monthA - monthB
    })

    setCategoryDetailData(monthlyData)
  }, [selectedCategory, transactions, categories])

  const formatAmount = (amount) => {
    return `${amount.toLocaleString()} ${currency}`
  }

  const handleCategoryClick = (data) => {
    setSelectedCategory(data.name)
  }

  const handleBackClick = () => {
    setSelectedCategory(null)
  }

  const renderCategoryDetail = () => {
    return (
      <div>
        <div className="flex items-center mb-4">
          <button onClick={handleBackClick} className="mr-2 p-2 rounded-full bg-sky-700 hover:bg-sky-800 text-white">
            ←
          </button>
          <h3 className="font-nohemiLight text-xl text-white">{selectedCategory} részletei</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryDetailData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatAmount(value)}
                labelFormatter={(label) => `${selectedCategory} - ${label}`}
              />
              <Bar
                dataKey="value"
                fill={activeTab === "income" ? "#4ade80" : "#f87171"}
                onClick={handleCategoryClick}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <div className="rounded-lg bg-black/20 p-4">
            <h3 className="font-nohemiLight text-lg text-white">Havi átlag</h3>
            <p className="text-2xl font-bold text-white">
              {formatAmount(
                categoryDetailData.reduce((sum, item) => sum + item.value, 0) / (categoryDetailData.length || 1),
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg border-2 border-sky-950 bg-black/30 backdrop-blur-sm shadow-md overflow-hidden">
      <div className="p-4 border-b border-sky-950">
        <h2 className="font-nohemiLight text-2xl text-white">Költségvetés Áttekintés</h2>
        <p className="text-gray-300">Bevételek és kiadások megoszlása</p>
      </div>

      <div className="p-4">
        {!selectedCategory && (
          <div className="flex space-x-1 rounded-lg bg-black/20 p-1 mb-4">
            <button
              onClick={() => setActiveTab("summary")}
              className={`flex-1 py-2 px-3 rounded-md font-nohemiLight text-white transition-colors ${
                activeTab === "summary" ? "bg-sky-700 shadow-sm" : "hover:bg-black/30"
              }`}
            >
              Összesítés
            </button>
            <button
              onClick={() => setActiveTab("income")}
              className={`flex-1 py-2 px-3 rounded-md font-nohemiLight text-white transition-colors ${
                activeTab === "income" ? "bg-sky-700 shadow-sm" : "hover:bg-black/30"
              }`}
            >
              Bevételek
            </button>
            <button
              onClick={() => setActiveTab("expenses")}
              className={`flex-1 py-2 px-3 rounded-md font-nohemiLight text-white transition-colors ${
                activeTab === "expenses" ? "bg-sky-700 shadow-sm" : "hover:bg-black/30"
              }`}
            >
              Kiadások
            </button>
          </div>
        )}

        <div className="mt-4">
          {selectedCategory ? (
            renderCategoryDetail()
          ) : (
            <>
              {activeTab === "summary" && (
                <div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={summaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatAmount(value)} />
                        <Bar dataKey="value">
                          {summaryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#4ade80" : "#f87171"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-green-600/30 p-4">
                      <h3 className="font-nohemiLight text-lg text-white">Összes bevétel</h3>
                      <p className="text-2xl font-bold text-white">{formatAmount(summaryData[0]?.value || 0)}</p>
                    </div>
                    <div className="rounded-lg bg-red-600/30 p-4">
                      <h3 className="font-nohemiLight text-lg text-white">Összes kiadás</h3>
                      <p className="text-2xl font-bold text-white">{formatAmount(summaryData[1]?.value || 0)}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "income" && (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        onClick={handleCategoryClick}
                      >
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatAmount(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeTab === "expenses" && (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        onClick={handleCategoryClick}
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index % COLORS.length) + 4]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatAmount(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}
          <CategoryDetailDiagram />
        </div>
      </div>
    </div>
  )
}




