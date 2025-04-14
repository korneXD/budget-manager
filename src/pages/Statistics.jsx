import React from "react";
import { BudgetDiagram } from "../components/budget-diagram";
import { useState } from "react";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Context } from "../context/Context";
import NotFound from "./NotFound";
import Footer from "../components/Footer";

export const Satistics = ({}) => {
  const { settings, categories, transactions } = useContext(Context);
  const { user } = useContext(UserContext);
  const [currencyName, setCurrency] = useState("");
  const [saveAs, setSaveAs] = useState("csv");
  const userTransactions =
    transactions?.filter((x) => x.userId === user?.uid) || [];

  useEffect(() => {
    settings?.forEach((e) => {
      if (e.id === user.uid) {
        setCurrency(e.currency);
      }
    });
  }, [settings, user]);

  const exportToTxt = () => {
    const userTransactions =
      transactions?.filter((x) => x.userId === user?.uid) || [];

    if (!userTransactions.length) return alert("Nincsenek adatok!");

    const header = "tranzakció neve;típus;dátum;összeg";

    const rows = userTransactions.map(
      (x) => `${x.name};${x.type};${x.date};${x.amount}`,
    );

    const currentDate = new Date().toLocaleDateString("hu-HU");
    const footer = `Money Map, ${currentDate}`;

    const content = [header, ...rows, footer].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tranzakciók.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToCSV = () => {
    const userTransactions =
      transactions?.filter((x) => x.userId === user?.uid) || [];

    if (!userTransactions.length) return alert("Nincsenek adatok!");

    const header = "tranzakció neve,típus,dátum,összeg";

    const rows = userTransactions.map(
      (x) => `${x.name},${x.type},${x.date},${x.amount}`,
    );

    const currentDate = new Date().toLocaleDateString("hu-HU");
    const footer = `Money Map,${currentDate}`;

    const content = [header, ...rows, footer].join("\n");

    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tranzakciók.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    document.title = "Money Map | Statisztika";
  }, []);

  if (!user) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <Header />
      <div className="mb-8 flex w-full max-w-screen-lg flex-col items-center justify-center gap-4 px-4">
        <BudgetDiagram
          transactions={userTransactions}
          categories={categories}
          currency={currencyName}
        />
        <p className="font-nohemiLight">
          Tranzakciók adatainak mentése CSV, vagy TXT fájlba.
        </p>
        <div className="flex items-center justify-center gap-4">
          <select
            name="save"
            id="save"
            className="rounded-lg border-2 border-sky-950 bg-sky-700 px-2 py-2 font-nohemi text-sky-200 outline-none"
            onChange={(e) =>
              e.target.value == "csv" ? setSaveAs("csv") : setSaveAs("txt")
            }
          >
            <option value="csv">CSV</option>
            <option value="txt">TXT</option>
          </select>

          <button
            onClick={saveAs == "csv" ? exportToCSV : exportToTxt}
            className="rounded-lg border-2 border-sky-950 bg-sky-700 px-2 py-1 font-nohemi uppercase text-sky-200"
          >
            mentés fájlba
          </button>
        </div>
      </div>
      <Footer />
      <Spotlight />
    </div>
  );
};
