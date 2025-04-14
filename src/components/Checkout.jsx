import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { deleteTransaction } from "../utility/crudUtility";
import { Context } from "../context/Context";
import { toast } from "sonner";
import { BudgetDiagram } from "./budget-diagram";
import Targets from "./Targets";

const Checkout = ({ categories, transactions }) => {
  const [currencyName, setCurrency] = useState("");
  const { user } = useContext(UserContext);
  const { settings } = useContext(Context);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  useEffect(() => {
    settings?.forEach((e) => {
      if (e.id === user.uid) {
        setCurrency(e.currency);
      }
    });
  }, [settings, user]);

  const currency = settings?.find((e) => e.id === user.uid);

  const deleteTrans = (id) => {
    try {
      deleteTransaction(id);
      toast.success("Tranzakció sikeresen kitörölve!");
    } catch (error) {
      console.log(error);
      toast.error("Tranzakció törlése sikertelen!");
    }
  };

  const deleteAllTransactions = () => {
    try {
      userTransactions.forEach((x) => deleteTransaction(x.id));
      toast.success("Minden tranzakció törölve!");
    } catch (error) {
      console.log(error);
      toast.error("Tranzakciók törlése sikertelen!");
    }
  };

  const userTransactions =
    transactions?.filter((x) => x.userId === user?.uid) || [];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="font-nohemiLight text-3xl">Tranzakciók</h1>

      <div className="relative flex flex-col items-center justify-center">
        <button
          onClick={() =>
            userTransactions.length == 0
              ? toast.info("Nincs egy tranzakciód sem.")
              : setShowDeleteAllConfirm(true)
          }
          className={`${
            userTransactions.length === 0 ? "opacity-50" : ""
          } rounded-lg bg-red-600 px-6 py-2 font-nohemiLight text-white shadow transition hover:bg-red-700`}
        >
          Összes tranzakció törlése
        </button>

        {transactionToDelete && (
          <div className="absolute left-0 right-0 top-0 z-50 flex w-full items-center justify-center py-8">
            <div className="rounded-xl border-2 border-sky-950 bg-black/70 p-6 text-center shadow-md backdrop-blur-sm">
              <h2 className="mb-4 font-nohemiLight text-xl text-white">
                Biztosan törlöd ezt a tranzakciót?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    deleteTrans(transactionToDelete);
                    setTransactionToDelete(null);
                  }}
                  className="rounded bg-red-600 px-4 py-0 font-nohemiLight text-white transition hover:bg-red-700"
                >
                  Igen, törlöm
                </button>
                <button
                  onClick={() => setTransactionToDelete(null)}
                  className="rounded bg-gray-300 px-4 py-0 font-nohemiLight text-black transition hover:bg-gray-400"
                >
                  Mégse
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteAllConfirm && (
          <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-center bg-opacity-50 py-8">
            <div className="rounded-xl border-2 border-sky-950 bg-black/70 p-6 text-center shadow-md backdrop-blur-sm">
              <h2 className="mb-4 font-nohemiLight text-xl text-white">
                Biztosan törlöd az összes tranzakciót?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    deleteAllTransactions();
                    setShowDeleteAllConfirm(false);
                  }}
                  className="rounded bg-red-600 px-4 py-0 font-nohemiLight text-white transition hover:bg-red-700"
                >
                  Igen, törlöm
                </button>
                <button
                  onClick={() => setShowDeleteAllConfirm(false)}
                  className="rounded bg-gray-300 px-4 py-0 font-nohemiLight text-black transition hover:bg-gray-400"
                >
                  Mégse
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex h-fit w-full items-center">
          <div className="mx-auto w-full px-5">
            <div className="mx-auto w-full md:max-w-5xl">
              <div className="min-w-full overflow-x-auto rounded-lg border-2 border-sky-950 shadow-md">
                <table className="min-w-full whitespace-nowrap rounded">
                  <thead className="border-b-2 border-sky-950 bg-black/20 backdrop-blur-sm">
                    <tr className="flex flex-col items-start justify-center md:flex-row">
                      <th className="px-3 py-3 text-left font-nohemiLight text-lg text-white">
                        📈 Típus
                      </th>
                      <th className="px-3 py-3 text-left font-nohemiLight text-lg text-white">
                        🛍️ Kategória
                      </th>
                      <th className="px-3 py-3 text-center font-nohemiLight text-lg text-white">
                        🕰️ Dátum
                      </th>
                      <th className="px-3 py-3 text-center font-nohemiLight text-lg text-white">
                        📝 Tranzakció
                      </th>
                      <th className="px-3 py-3 text-right font-nohemiLight text-lg text-white">
                        💸 Összeg
                      </th>
                      <th className="flex justify-center px-3 py-3 font-nohemiLight text-lg text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-950">
                    {userTransactions.map((x, index) => (
                      <tr
                        key={index}
                        className={
                          x.type === "Bevétel"
                            ? "flex flex-col items-center justify-center bg-green-600/50 md:flex-row"
                            : "flex flex-col items-center justify-center bg-red-600/50 md:flex-row"
                        }
                      >
                        <td className="px-3 py-4 text-center font-nohemiLight text-lg text-white">
                          {x.type}
                        </td>
                        <td className="px-3 py-4 text-left">
                          {categories?.map(
                            (e) =>
                              e.userId === user?.uid &&
                              e.id === x.categId && (
                                <span
                                  key={e.name}
                                  className="font-nohemiLight text-lg text-white"
                                >
                                  {e.name}
                                </span>
                              ),
                          )}
                        </td>
                        <td className="px-3 py-4 text-center font-nohemiLight text-lg text-white">
                          {x.date}
                        </td>
                        <td className="w-fit truncate px-3 py-4 text-left font-nohemiLight text-lg text-white md:max-w-[150px]">
                          {x.name}
                        </td>
                        <td className="w-fit truncate px-3 py-4 text-right font-nohemiLight text-lg text-white md:max-w-[250px]">
                          {x.amount + " " + currency?.currency}
                        </td>
                        <td className="flex w-fit items-center justify-center gap-4 px-3 py-4 text-center text-white md:w-20">
                          <svg
                            onClick={() => setTransactionToDelete(x.id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4 cursor-pointer md:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166
                              m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772
                              5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0
                              0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
                              51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5
                              0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
