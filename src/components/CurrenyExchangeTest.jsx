import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addTransaction } from "../utility/crudUtility";

const BASE_CURRENCY = "HUF";

const BudgetManager = ({ values }) => {
  const { user } = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  const newTransaction = () => {
    let transactionData = {
      amount: parseFloat(amount),
      name: name,
      currency: currency,
      categId: data?.id,
      userId: user?.uid,
    };
    console.log(transactionData);
  };

  const currencies = ["EUR", "USD", "GBP", "HUF"];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="font-nohemiLight text-3xl">Tranzakció hozzáadása</h2>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {values && (
            <select className="w-fit rounded-lg border-2 border-sky-950 bg-black/30 px-2 py-1 font-nohemiLight text-xl tracking-wide text-gray-400 outline-none backdrop-blur-sm">
              {values?.map(
                (e, index) =>
                  e.userId == user?.uid && (
                    <option
                      key={index}
                      onClick={() => console.log("valami")}
                      value={e.name}
                      className="absolute top-full z-20 flex h-fit w-full flex-col items-center justify-center divide-y divide-stone-400 rounded-lg border-2 border-sky-950 bg-stone-900 px-2 shadow-md"
                    >
                      {e.name}
                    </option>
                  ),
              )}
            </select>
          )}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-fit rounded-lg border-2 border-sky-950 bg-black/30 px-2 py-1 font-nohemiLight text-xl tracking-wide text-gray-400 outline-none backdrop-blur-sm"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr} onClick={() => setCurrency(curr)}>
                {curr}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Név"
            className="text-md rounded-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight text-xl tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Összeg"
            className="text-md rounded-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight text-xl tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
          />
        </div>
        <input
          type="submit"
          value="Hozzáadás"
          onClick={newTransaction}
          className="text-md my-2 cursor-pointer rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        />
      </div>
    </div>
  );
};

export default BudgetManager;
