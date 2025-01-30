import React from "react";
import { addTransaction } from "../utility/crudUtility";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";

const Transactions = ({ values }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [transactionName, setTransactionName] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onSubmitTransactions = (e) => {
    e.preventDefault();
    setTransactionName("");
    let transactionData = {
      name: transactionName,
      userId: user.uid,
      categId: data.id,
    };
    if (transactionName) addTransaction(transactionData);
    document.getElementById("transactionName").value = "";
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="font-nohemiLight text-3xl">Tranzakciók</h1>
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
      <form onSubmit={onSubmitTransactions} className="flex flex-row">
        <div>
          <input
            disabled={!data.name}
            type="name"
            name="name"
            id="transactionName"
            placeholder="Tranzakció neve"
            onChange={(e) => setTransactionName(e.target.value)}
            className="my-2 rounded-l-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight text-xl tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
          />
        </div>
        <input
          type="submit"
          value="+"
          onClick={() => {
            if (!transactionName) toast.info("Adj meg a tranzakció nevét!");
          }}
          className="my-2 cursor-pointer rounded-r-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        />
      </form>
    </div>
  );
};

export default Transactions;
