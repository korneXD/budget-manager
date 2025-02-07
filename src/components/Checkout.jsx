import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { deleteTransaction } from "../utility/crudUtility";
import { Context } from "../context/Context";
import { toast } from "sonner";

const Checkout = ({ categories, transactions }) => {
  const [currencyName, setCurrency] = useState("");
  const [previousCurrency, setPreviousCurrency] = useState("");
  const { user } = useContext(UserContext);
  const { settings } = useContext(Context);
  const [exchangeRates, setExchangeRates] = useState({});

  const apiKey = import.meta.env.VITE_APP_CURRENCY_API_KEY;
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyName}`;

  useEffect(() => {
    settings?.forEach((e) => {
      if (e.id === user.uid) {
        setCurrency(e.currency);
      }
    });
  }, [settings, user]);

  /*useEffect(() => {
    const fetchRates = async () => {
      if (!currencyName) return;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error("Hiba történt az API lekérdezésekor:", error);
      }
    };
    fetchRates();
  }, [currencyName]);

  const convertAmount = (amount, fromCurrency) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[currencyName])
      return amount;
    const convertedAmount =
      (amount / exchangeRates[fromCurrency]) * exchangeRates[currencyName];
    return convertedAmount.toFixed(2);
  };*/

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
                    <th className="px-3 py-3 text-left font-nohemiLight text-lg text-white">
                      Kategória
                    </th>
                    <th className="px-3 py-3 text-center font-nohemiLight text-lg text-white">
                      Dátum
                    </th>
                    <th className="px-3 py-3 text-center font-nohemiLight text-lg text-white">
                      Tranzakció
                    </th>
                    <th className="px-3 py-3 text-right font-nohemiLight text-lg text-white">
                      Összeg
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-950">
                  {transactions?.map((x, index) =>
                    x.userId === user?.uid ? (
                      <tr key={index}>
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
                          {x.timeStamp?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 text-left font-nohemiLight text-lg text-white">
                          {x.name}
                        </td>
                        <td className="px-3 py-4 text-right font-nohemiLight text-lg text-white">
                          {currencyName}
                        </td>
                        <td className="flex w-20 items-center justify-center gap-4 px-3 py-4 text-center text-white">
                          <svg
                            onClick={() => deleteTrans(x.id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </td>
                      </tr>
                    ) : null,
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
