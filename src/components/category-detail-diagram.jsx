import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export const CategoryDetailDiagram = ({ transactions, category, currency }) => {
  const [monthlyData, setMonthlyData] = useState([])
  const [subcategoryData, setSubcategoryData] = useState([])
  const [activeView, setActiveView] = useState("monthly")

  const COLORS = ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#93c5fd", "#bfdbfe"]

  useEffect(() => {
    if (!transactions || !category) return
    const byMonth = {}
    const bySubcategory = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
      const monthName = date.toLocaleString("hu-HU", { month: "short" })

      if (!byMonth[monthKey]) {
        byMonth[monthKey] = {
          name: monthName,
          value: 0,
          month: date.getMonth(),
          year: date.getFullYear(),
        }
      }

      byMonth[monthKey].value += Number.parseFloat(transaction.amount)

      const subcategory = transaction.subcategory || "Egyéb"
      if (!bySubcategory[subcategory]) {
        bySubcategory[subcategory] = {
          name: subcategory,
          value: 0,
        }
      }

      bySubcategory[subcategory].value += Number.parseFloat(transaction.amount)
    })

    const monthlyDataArray = Object.values(byMonth).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })

    const subcategoryDataArray = Object.values(bySubcategory).sort((a, b) => b.value - a.value)

    setMonthlyData(monthlyDataArray)
    setSubcategoryData(subcategoryDataArray)
  }, [transactions, category])

  const formatAmount = (amount) => {
    return `${amount.toLocaleString()} ${currency}`
  }

  return (
    
    <div className="w-full rounded-lg border-2 border-sky-950 bg-black/30 backdrop-blur-sm shadow-md overflow-hidden">
      <div className="p-4 border-b border-sky-950">
        <h2 className="font-nohemiLight text-2xl text-white">{category} részletes elemzés</h2>
        <p className="text-gray-300">Időbeli és alkategória szerinti bontás</p>
      </div>

      <div className="p-4">
        <div className="flex space-x-1 rounded-lg bg-black/20 p-1 mb-4">
          <button
            onClick={() => setActiveView("monthly")}
            className={`flex-1 py-2 px-3 rounded-md font-nohemiLight text-white transition-colors ${
              activeView === "monthly" ? "bg-sky-700 shadow-sm" : "hover:bg-black/30"
            }`}
          >
            Havi bontás
          </button>
          <button
            onClick={() => setActiveView("trend")}
            className={`flex-1 py-2 px-3 rounded-md font-nohemiLight text-white transition-colors ${
              activeView === "trend" ? "bg-sky-700 shadow-sm" : "hover:bg-black/30"
            }`}
          >
            Trend
          </button>
          <button
            onClick={() => setActiveView("subcategory")}
            className={`flex-1 py-2 px-3 rounded-md font-nohemiLight text-white transition-colors ${
              activeView === "subcategory" ? "bg-sky-700 shadow-sm" : "hover:bg-black/30"
            }`}
          >
            Alkategóriák
          </button>
        </div>

        <div className="h-80">
          {activeView === "monthly" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatAmount(value)}
                  labelFormatter={(label) => `${category} - ${label}`}
                />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeView === "trend" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatAmount(value)}
                  labelFormatter={(label) => `${category} - ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeView === "subcategory" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subcategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {subcategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-black/20 p-4">
            <h3 className="font-nohemiLight text-lg text-white">Összes</h3>
            <p className="text-2xl font-bold text-white">
              {formatAmount(monthlyData.reduce((sum, item) => sum + item.value, 0))}
            </p>
          </div>
          <div className="rounded-lg bg-black/20 p-4">
            <h3 className="font-nohemiLight text-lg text-white">Havi átlag</h3>
            <p className="text-2xl font-bold text-white">
              {formatAmount(monthlyData.reduce((sum, item) => sum + item.value, 0) / (monthlyData.length || 1))}
            </p>
          </div>
          <div className="rounded-lg bg-black/20 p-4">
            <h3 className="font-nohemiLight text-lg text-white">Legnagyobb tétel</h3>
            <p className="text-2xl font-bold text-white">
              {formatAmount(Math.max(...monthlyData.map((item) => item.value), 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

