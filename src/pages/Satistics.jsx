import React from 'react'
import { BudgetDiagram } from "../components/budget-diagram"
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Spotlight } from '../components/Spotlight'
import { useContext } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Context } from '../context/Context'



export const Satistics = ({categories,transactions}) => {
    const [currencyName, setCurrency] = useState("")
    const userTransactions = transactions?.filter((x) => x.userId === user?.uid) || []
    const { user } = useContext(UserContext)
    const { settings } = useContext(Context)
    
      useEffect(() => {
        settings?.forEach((e) => {
          if (e.id === user.uid) {
            setCurrency(e.currency)
          }
        })
      }, [settings, user])
  return (
    <div>
        
        <Navbar />
            <div className="w-full max-w-screen-lg mb-8">
                <BudgetDiagram transactions={userTransactions} categories={categories} currency={currencyName} />
            </div>
        <Spotlight />

    </div>
  )
}