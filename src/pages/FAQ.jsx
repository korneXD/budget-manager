import { useState } from "react"
import { Spotlight } from "../components/Spotlight"
import Navbar from "../components/Navbar"

const faqData = [
  {
    category: "Account",
    questions: [
      {
        id: "account-1",
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your details including your name, email address, and password. Then click 'Create Account' to complete the process.",
      },
      {
        id: "account-2",
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password.",
      },
      {
        id: "account-3",
        question: "Can I have multiple accounts?",
        answer:
          "Yes, you can create multiple accounts with different email addresses. However, please note that each account will be treated separately and will have its own settings, history, and preferences.",
      },
    ],
  },
  {
    category: "Billing",
    questions: [
      {
        id: "billing-1",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions.",
      },
      {
        id: "billing-2",
        question: "How do I update my billing information?",
        answer:
          "You can update your billing information by going to 'Account Settings' > 'Billing' and clicking on 'Edit Payment Method'. From there, you can update your credit card details or change your payment method.",
      },
      {
        id: "billing-3",
        question: "Can I get a refund?",
        answer:
          "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, you can request a refund within 30 days of your initial purchase. For refund requests, please contact our support team.",
      },
    ],
  },
  {
    category: "Services",
    questions: [
      {
        id: "services-1",
        question: "What services do you offer?",
        answer:
          "We offer a wide range of services including web design, development, hosting, maintenance, SEO optimization, and digital marketing. Each service can be customized to meet your specific needs and requirements.",
      },
      {
        id: "services-2",
        question: "Do you offer custom solutions?",
        answer:
          "Yes, we specialize in creating custom solutions tailored to your business needs. Our team will work closely with you to understand your requirements and develop a solution that meets your specific goals.",
      },
      {
        id: "services-3",
        question: "How long does it take to complete a project?",
        answer:
          "Project timelines vary depending on the scope and complexity of the work. A simple website might take 2-4 weeks, while more complex projects could take several months. We'll provide you with a detailed timeline during the initial consultation.",
      },
    ],
  },
  {
    category: "Support",
    questions: [
      {
        id: "support-1",
        question: "How can I contact customer support?",
        answer:
          "You can contact our customer support team via email at support@example.com, through the live chat on our website, or by calling our support line at (123) 456-7890. Our support hours are Monday to Friday, 9 AM to 6 PM EST.",
      },
      {
        id: "support-2",
        question: "Do you offer 24/7 support?",
        answer:
          "We offer 24/7 emergency support for critical issues. For non-critical issues, our regular support hours apply. Premium support plans with extended hours are available for enterprise customers.",
      },
      {
        id: "support-3",
        question: "Is there a knowledge base or documentation?",
        answer:
          "Yes, we have a comprehensive knowledge base with tutorials, guides, and documentation. You can access it by clicking on the 'Help' section in your account dashboard or by visiting docs.example.com.",
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

export const FAQ = ()=> {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState([])
  const [expandedQuestions, setExpandedQuestions] = useState([])

  
  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  
  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  
  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]))
  }

  return (
    <div>
    <Navbar />
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-white max-w-2xl mx-auto">
          Find answers to common questions about our products and services. If you can't find what you're looking for,
          please contact our support team.
        </p>
      </div>

    
      <div className="relative mb-10 max-w-md mx-auto">
        <div className="relative">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search for questions..."
            className="w-full pl-10 pr-4 py-2 border text-sky-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-sky-500 mt-2">
            {filteredFAQs.reduce((count, category) => count + category.questions.length, 0)} results found
          </p>
        )}
      </div>

    
      <div className="space-y-8">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category) => (
            <div key={category.category} className="border border-gray-200 rounded-lg p-6">
              
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleCategory(category.category)}
              >
                <h2 className="text-xl font-semibold">{category.category}</h2>
                <button className="text-gray-500 hover:text-sky-500 px-3 py-1 rounded-md hover:bg-gray-100">
                  {expandedCategories.includes(category.category) ? "Hide" : "Show"}
                </button>
              </div>

              
              {(expandedCategories.includes(category.category) || searchQuery) && (
                <div className="mt-4 space-y-3">
                  {category.questions.map((item) => (
                    <div key={item.id} className="border-t border-gray-100 pt-3">
                      <button
                        className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
                        onClick={() => toggleQuestion(item.id)}
                        aria-expanded={expandedQuestions.includes(item.id)}
                      >
                        <span className="font-medium">{item.question}</span>
                        <ChevronIcon isOpen={expandedQuestions.includes(item.id)} />
                      </button>
                      {expandedQuestions.includes(item.id) && (
                        <div className="mt-2 text-white pl-2 pr-6 pb-2">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-white">No questions found matching your search. Try a different query.</p>
          </div>
        )}
      </div>

  
      <div className="mt-16 text-center p-8 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-white mb-6">
          If you couldn't find the answer to your question, our support team is here to help.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
          Contact Support
        </button>
      </div>
    </div>
    <Spotlight />
    </div>
  )
}

