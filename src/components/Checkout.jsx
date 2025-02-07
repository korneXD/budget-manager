import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { deleteTransaction, deleteTransactions } from "../utility/crudUtility";
import { Context } from "../context/Context";
import { toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Checkout = ({ categories, transactions }) => {
  const [currencyName, setCurrency] = useState("");
  const { user } = useContext(UserContext);
  const { settings } = useContext(Context);
  const [exchangeAmount, setExchange] = useState("");

  const apiKey = import.meta.env.VITE_APP_CURRENCY_API_KEY;

  useEffect(() => {
    settings?.map((e) => {
      if (e.id == user.uid) setCurrency(e.currency);
    });
  }, [settings, user]);

  useEffect(() => {
    const exchange = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${currencyName}`,
        );
        setExchange(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setExchange();
    };
  }, [currencyName]);

  const deleteTrans = (id) => {
    try {
      deleteTransaction(id);
      toast.success("Tranzakció sikeresen kitörölve!");
    } catch (error) {
      console.log(error);
      toast.error("Tranzakció törlése sikertelen!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-nohemiLight text-3xl">Checkout</h1>

      <div className="flex h-fit items-center">
        <div className="mx-auto w-full px-5">
          <div className="mx-auto max-w-screen-lg">
            <div className="min-w-full overflow-x-auto rounded-lg border-2 border-sky-950 shadow-md">
              <table className="min-w-full whitespace-nowrap rounded">
                <thead className="border-b-2 border-sky-950 bg-black/30 backdrop-blur-sm">
                  <tr>
                    <th className="px-3 py-3 text-left align-middle font-nohemiLight text-lg font-normal uppercase text-white">
                      Kategória
                    </th>
                    <th className="px-3 py-3 text-center align-middle font-nohemiLight text-lg font-normal uppercase text-white">
                      Dátum
                    </th>
                    <th className="px-3 py-3 text-center align-middle font-nohemiLight text-lg font-normal uppercase text-white">
                      Tranzakciók
                    </th>
                    <th className="px-3 py-3 text-right align-middle font-nohemiLight text-lg font-normal uppercase text-white">
                      Összeg
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-950">
                  {transactions?.map(
                    (x, index) =>
                      x.userId == user?.uid && (
                        <tr key={index}>
                          <td className="px-3 py-4 text-left">
                            {categories?.map(
                              (e) =>
                                e.userId == user?.uid &&
                                e.id == x.categId && (
                                  <span
                                    key={e?.name}
                                    className="font-nohemiLight text-lg text-white"
                                    onClick={() => setData(e)}
                                  >
                                    {e.name}
                                  </span>
                                ),
                            )}
                          </td>
                          <td className="px-3 py-4 text-center font-nohemiLight text-lg text-white">
                            {x.timeStamp?.toDate().toLocaleDateString()}
                          </td>
                          <td className="px-3 py-4 text-left font-nohemiLight text-lg text-white">
                            {x.name}
                          </td>
                          <td className="px-3 py-4 text-right font-nohemiLight text-lg text-white">
                            {x.amount}
                            {" " + currencyName}
                          </td>
                          <td className="flex w-20 items-center justify-center gap-4 px-3 py-4 text-center text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 cursor-pointer"
                              onClick={() => deleteTrans(x.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </td>
                        </tr>
                      ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
