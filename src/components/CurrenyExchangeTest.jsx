import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const API_KEY = import.meta.env.VITE_APP_CURRENCYAPI;
const BASE_CURRENCY = "HUF";

const BudgetManager = ({ values }) => {
  const { user } = useContext(UserContext);
  const [rates, setRates] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`,
        );
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
    const convertedAmount =
      (parseFloat(amount) / exchangeRate) * rates[BASE_CURRENCY];

    setTransactions([
      ...transactions,
      {
        amount: parseFloat(amount),
        currency,
        convertedAmount,
        baseCurrency: BASE_CURRENCY,
      },
    ]);

    setAmount("");
  };

  const total = transactions.reduce((acc, t) => acc + t.convertedAmount, 0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="font-nohemiLight text-3xl">Budget Manager</h2>
      <div className="flex w-full flex-col items-center justify-center">
        {values && (
          <div
            className="relative z-10 flex h-fit w-fit min-w-[30%] max-w-[35%] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-sky-950 bg-black/20 px-6 text-center shadow-md backdrop-blur-md"
            onClick={() => setOpen(!open)}
          >
            <h1 className="w-full font-nohemiLight text-2xl">
              {data?.name ? data.name : "Nincs"}
            </h1>
            {open && (
              <div className="absolute top-full z-20 flex h-fit w-full flex-col items-center justify-center divide-y divide-stone-400 rounded-lg border-2 border-sky-950 bg-stone-900 px-2 shadow-md">
                {values?.map(
                  (e) =>
                    e.userId == user?.uid && (
                      <span
                        key={e?.name}
                        className="w-full text-center font-nohemiLight text-2xl text-sky-200"
                        onClick={() => setData(e)}
                      >
                        {e.name}
                      </span>
                    ),
                )}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-row items-center justify-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Összeg"
            className="text-md my-2 rounded-l-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight text-xl tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
          />
          <input
            type="submit"
            value="+"
            onClick={addTransaction}
            className="my-2 cursor-pointer rounded-r-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
          />
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-fit rounded-xl border-2 border-sky-950 bg-black/30 px-2 py-2 font-nohemiLight text-xl tracking-wide text-gray-400 backdrop-blur-sm"
        >
          {Object.keys(rates).map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
      <h1 className="py-1 font-nohemiLight text-xl">
        {BASE_CURRENCY} → {currency}
      </h1>
      {transactions.map((t, index) => (
        <h3 key={index} className="font-nohemiLight text-xl">
          Összesített egyenleg: {t.convertedAmount.toFixed(2)} {BASE_CURRENCY}
        </h3>
      ))}
    </div>
  );
};

export default BudgetManager;
