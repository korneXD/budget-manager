import { useState } from "react"
import Navbar from "../components/Navbar"
import { Spotlight } from "../components/Spotlight"

const budgetTipsData = [
  {
    category: "Budgeting Basics",
    tips: [
      {
        id: "basics-1",
        title: "The 50/30/20 Rule",
        description:
          "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment. This simple framework helps create a balanced budget that covers all your financial bases.",
      },
      {
        id: "basics-2",
        title: "Track Your Spending",
        description:
          "Record all your expenses for at least 30 days to understand where your money is going. This awareness is the foundation of any successful budget and often reveals surprising spending patterns.",
      },
      {
        id: "basics-3",
        title: "Use Budgeting Tools",
        description:
          "Take advantage of budgeting apps and spreadsheets to automate tracking and categorization. Many free tools are available that can sync with your accounts and provide visual reports of your finances.",
      },
    ],
  },
  {
    category: "Saving Strategies",
    tips: [
      {
        id: "saving-1",
        title: "Build an Emergency Fund",
        description:
          "Save 3-6 months of essential expenses in an easily accessible account. This fund provides financial security and prevents you from going into debt when unexpected expenses arise.",
      },
      {
        id: "saving-2",
        title: "Automate Your Savings",
        description:
          "Set up automatic transfers to your savings account on payday. What you don't see, you won't spend, and your savings will grow consistently without requiring willpower.",
      },
      {
        id: "saving-3",
        title: "Use the 24-Hour Rule",
        description:
          "Wait 24 hours before making any non-essential purchase over $50. This cooling-off period helps avoid impulse buying and ensures you only spend on things you truly value.",
      },
    ],
  },
  {
    category: "Debt Management",
    tips: [
      {
        id: "debt-1",
        title: "Debt Avalanche Method",
        description:
          "Focus on paying off debts with the highest interest rates first while making minimum payments on others. This approach saves you the most money in interest over time.",
      },
      {
        id: "debt-2",
        title: "Debt Snowball Method",
        description:
          "Pay off your smallest debts first to build momentum and motivation. Each debt you eliminate gives you a psychological win that helps maintain your commitment to becoming debt-free.",
      },
      {
        id: "debt-3",
        title: "Consider Consolidation",
        description:
          "Look into debt consolidation options if you have high-interest debts. Combining multiple debts into a single loan with a lower interest rate can make repayment more manageable.",
      },
    ],
  },
  {
    category: "Spending Less",
    tips: [
      {
        id: "spending-1",
        title: "Review Subscriptions",
        description:
          "Audit all your subscriptions and memberships monthly. Cancel those you don't use regularly or don't provide sufficient value relative to their cost.",
      },
      {
        id: "spending-2",
        title: "Meal Planning",
        description:
          "Plan your meals for the week and shop with a list. This reduces food waste and prevents expensive impulse purchases or frequent takeout orders.",
      },
      {
        id: "spending-3",
        title: "Use Cashback and Rewards",
        description:
          "Maximize cashback apps, credit card rewards, and loyalty programs for purchases you would make anyway. These small amounts add up significantly over time.",
      },
    ],
  },
]


const SearchIcon = () => (
  <svg
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const ChevronIcon = ({ isOpen }) => (
  <svg
    className="h-5 w-5 text-sky-500"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={isOpen ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
  </svg>
)

export const BudgetTips = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState([])
  const [expandedTips, setExpandedTips] = useState([])

  
  const filteredTips = budgetTipsData
    .map((category) => ({
      ...category,
      tips: category.tips.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.tips.length > 0)

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  
  const toggleTip = (id) => {
    setExpandedTips((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  return (
    <div>
         <Navbar />
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4 text-white">Budget Tips & Strategies</h1>
          <p className="text-white max-w-2xl mx-auto">
            Discover practical budgeting advice to help you save more, spend wisely, and achieve your financial goals.
          </p>
        </div>

        
        <div className="relative mb-10 max-w-md mx-auto">
          <div className="relative">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for budget tips..."
              className="w-full pl-10 pr-4 py-2 border text-sky-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-sky-500 mt-2">
              {filteredTips.reduce((count, category) => count + category.tips.length, 0)} results found
            </p>
          )}
        </div>

    
        <div className="space-y-8">
          {filteredTips.length > 0 ? (
            filteredTips.map((category) => (
              <div key={category.category} className="border border-sky-700 rounded-lg p-6 bg-sky-800">
                
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCategory(category.category)}
                >
                  <h2 className="text-xl font-semibold text-white">{category.category}</h2>
                  <button className="text-gray-400 hover:text-sky-500 px-3 py-1 rounded-md hover:bg-sky-700">
                    {expandedCategories.includes(category.category) ? "Hide" : "Show"}
                  </button>
                </div>

                
                {(expandedCategories.includes(category.category) || searchQuery) && (
                  <div className="mt-4 space-y-3">
                    {category.tips.map((item) => (
                      <div key={item.id} className="border-t border-sky-700 pt-3">
                        <button
                          className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
                          onClick={() => toggleTip(item.id)}
                          aria-expanded={expandedTips.includes(item.id)}
                        >
                          <span className="font-medium text-white">{item.title}</span>
                          <ChevronIcon isOpen={expandedTips.includes(item.id)} />
                        </button>
                        {expandedTips.includes(item.id) && (
                          <div className="mt-2 text-sky-300 pl-2 pr-6 pb-2">
                            <p>{item.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-800 rounded-lg">
              <p className="text-white">No budget tips found matching your search. Try a different query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <Spotlight />
    </div>
  )
}

export default BudgetTips

