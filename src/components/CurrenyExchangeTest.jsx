import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addTransaction } from "../utility/crudUtility";
import { toast } from "sonner";

const BASE_CURRENCY = "HUF";

const BudgetManager = ({ values }) => {
  const { user } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [type, setType] = useState("Bevétel");

  useEffect(() => {
    if (values && user?.uid) {
      const firstMatchingData = values.find((data) => data.userId === user.uid);
      if (firstMatchingData) {
        setData(firstMatchingData);
      }
    }
  }, [values, user?.uid]);

  const newTransaction = () => {
    let transactionData = {
      amount: parseFloat(amount),
      name: name,
      type: type,
      categId: data?.id,
      userId: user?.uid,
    };
    if (
      transactionData.amount === 0 ||
      transactionData.name === "" ||
      transactionData.type === ""
    ) {
      toast.warning("Hiányzó adatok!");
    } else {
      addTransaction(transactionData);
      setAmount(0);
      setName("");
      setType("Bevétel");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="font-nohemiLight text-3xl">
        <span className="capitalize">{type}</span> hozzáadása
      </h2>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {values && (
            <select
              value={data?.name || ""}
              onChange={(e) => {
                const selectedData = values.find(
                  (data) =>
                    data.userId === user?.uid && data.name === e.target.value,
                );
                if (selectedData) {
                  setData(selectedData);
                }
              }}
              className="w-fit rounded-lg border-2 border-sky-950 bg-black/30 px-2 py-1 font-nohemiLight text-xl tracking-wide text-gray-400 outline-none backdrop-blur-sm"
            >
              {values?.map(
                (data, index) =>
                  data.userId == user?.uid && (
                    <option
                      key={index}
                      value={data.name}
                      className="absolute top-full z-20 flex h-fit w-full flex-col items-center justify-center divide-y divide-stone-400 rounded-lg border-2 border-sky-950 bg-stone-900 px-2 shadow-md"
                    >
                      {data.name}
                    </option>
                  ),
              )}
            </select>
          )}
          <button
            onClick={() => setType("Bevétel")}
            className="mx-1 w-fit rounded-lg border-2 border-green-500 bg-green-500/30 font-nohemiLight text-xl tracking-wide text-gray-400 outline-none backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <button
            onClick={() => setType("Kiadás")}
            className="w-fit rounded-lg border-2 border-red-500 bg-red-500/30 font-nohemiLight text-xl tracking-wide text-gray-400 outline-none backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-red-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
        </div>
        <div className="mt-1 flex flex-col items-center justify-center gap-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Név"
            className="text-md rounded-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight text-xl tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
          />
          <input
            type="number"
            value={amount == 0 ? "" : amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Összeg"
            min="0"
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
