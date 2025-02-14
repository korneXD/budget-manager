import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = ""; 
const BASE_CURRENCY = "HUF"; 

const BudgetManager = () => {
  const [rates, setRates] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");


  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`);
        setRates(response.data.data);
      } catch (error) {
        console.error("Hiba az árfolyamok lekérésekor:", error);
      }
    };
    fetchRates();
  }, []);

  const addTransaction = () => {
    if (!amount || !currency || !rates[currency]) return;

    const exchangeRate = rates[currency] || 1;
    const convertedAmount = parseFloat(amount) / exchangeRate * rates[BASE_CURRENCY];

    setTransactions([
      ...transactions,
      { amount: parseFloat(amount), currency, convertedAmount, baseCurrency: BASE_CURRENCY },
    ]);
    
    setAmount("");
  };

  const total = transactions.reduce((acc, t) => acc + t.convertedAmount, 0);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Budget Manager</h2>

      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Összeg"
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {Object.keys(rates).map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
        <button onClick={addTransaction}>Hozzáadás</button>
      </div>

      <h3>Tranzakciók (Alap pénznem: {BASE_CURRENCY})</h3>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.amount} {t.currency} → {t.convertedAmount.toFixed(2)} {BASE_CURRENCY}
          </li>
        ))}
      </ul>

      <h3>Összesített egyenleg: {total.toFixed(2)} {BASE_CURRENCY}</h3>
    </div>
  );
};

export default BudgetManager;
