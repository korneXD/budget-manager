import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addTransaction } from "../utility/crudUtility";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BudgetManager = ({ values }) => {
  const { user } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [type, setType] = useState("Bevétel");

  const nowDate = new Date();
  const [date, setDate] = useState(nowDate.toLocaleDateString());

  const [isPickerVisible, setIsPickerVisible] = useState(false);

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
      date: date,
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
      setDate(nowDate.toLocaleDateString());
      setAmount(0);
      setName("");
      setType("Bevétel");
    }
  };

  const handleDate = (date) => {
    setDate(date.toLocaleDateString());
    setIsPickerVisible(false);
  };

  return (
    <div className="flex h-full w-full select-none flex-col items-center justify-center">
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
        <div className="relative flex items-center justify-center gap-2">
          <div className="relative flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <p className="font-nohemiLight text-sky-400">{date}</p>
              <div
                onClick={() => setIsPickerVisible(!isPickerVisible)}
                className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-sky-950 bg-sky-800 p-1 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 stroke-2 text-sky-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </div>
            </div>
            {isPickerVisible && (
              <div className="absolute top-10 z-10">
                <DatePicker
                  selected={new Date()}
                  onChange={(e) => handleDate(e)}
                  inline
                  sty
                  maxDate={new Date()}
                />
              </div>
            )}
          </div>
          <input
            type="submit"
            value="Hozzáadás"
            onClick={newTransaction}
            className="text-md my-2 h-full cursor-pointer rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetManager;
