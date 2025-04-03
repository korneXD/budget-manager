import { useState, useEffect } from "react"


// Example data - csak példa de majd a fetchelt data kéne ide
const mockTransactions = [
  { id: 1, categId: 1, amount: "150000", type: "Bevétel", date: "2023-01-15" },
  { id: 2, categId: 1, amount: "150000", type: "Bevétel", date: "2023-02-15" },
  { id: 3, categId: 2, amount: "80000", type: "Bevétel", date: "2023-01-20" },
  { id: 4, categId: 3, amount: "45000", type: "Kiadás", date: "2023-01-05", subcategory: "Élelmiszer" },
  { id: 5, categId: 3, amount: "48000", type: "Kiadás", date: "2023-02-05", subcategory: "Élelmiszer" },
  { id: 6, categId: 4, amount: "25000", type: "Kiadás", date: "2023-01-10", subcategory: "Internet" },
  { id: 7, categId: 4, amount: "25000", type: "Kiadás", date: "2023-02-10", subcategory: "Internet" },
  { id: 8, categId: 4, amount: "15000", type: "Kiadás", date: "2023-01-12", subcategory: "Telefon" },
  { id: 9, categId: 4, amount: "15000", type: "Kiadás", date: "2023-02-12", subcategory: "Telefon" },
  { id: 10, categId: 5, amount: "35000", type: "Kiadás", date: "2023-01-25" },
  { id: 11, categId: 5, amount: "42000", type: "Kiadás", date: "2023-02-25" },
]

const mockCategories = [
  { id: 1, name: "Fizetés" },
  { id: 2, name: "Egyéb bevétel" },
  { id: 3, name: "Élelmiszer" },
  { id: 4, name: "Rezsi" },
  { id: 5, name: "Szórakozás" },
]

export default function CategoryAnalysisPage() {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryTransactions, setCategoryTransactions] = useState([])

  useEffect(() => {
    setTransactions(mockTransactions)
    setCategories(mockCategories)
  }, [])

  useEffect(() => {
    if (selectedCategory && transactions.length > 0) {
      const categoryId = categories.find((c) => c.name === selectedCategory)?.id
      if (categoryId) {
        const filteredTransactions = transactions.filter((t) => t.categId === categoryId)
        setCategoryTransactions(filteredTransactions)
      }
    }
  }, [selectedCategory, transactions, categories])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-nohemiLight text-white mb-8">Költségvetés Elemzés</h1>

        <div className="grid gap-8">
          <BudgetDiagram transactions={transactions} categories={categories} currency="Ft" />

          <div className="grid gap-4">
            <h2 className="text-2xl font-nohemiLight text-white">Kategória részletes elemzés</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-4 py-2 rounded-lg font-nohemiLight text-white transition-colors ${
                    selectedCategory === category.name ? "bg-sky-700 shadow-sm" : "bg-black/30 hover:bg-black/50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {selectedCategory ? (
              <CategoryDetailDiagram transactions={categoryTransactions} category={selectedCategory} currency="Ft" />
            ) : (
              <div className="rounded-lg border-2 border-sky-950 bg-black/30 backdrop-blur-sm shadow-md p-8 text-center">
                <p className="text-white text-lg">Válassz egy kategóriát a részletes elemzéshez</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

