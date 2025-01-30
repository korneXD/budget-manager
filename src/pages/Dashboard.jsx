import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Context } from "../context/Context";
import Header from "../components/Header";
import NotFound from "../pages/NotFound";
import { useState } from "react";
import { addCateg, addTransaction } from "../utility/crudUtility";
import { Spotlight } from "../components/Spotlight";
import { useEffect } from "react";
import { toast } from "sonner";
import Transactions from "../components/Transactions";
import Categories from "../components/Categories";
import Checkout from "../components/Checkout";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { categories } = useContext(Context);
  const { transactions } = useContext(Context);

  useEffect(() => {
    document.title = "Budget Manager | Kezelőpanel";
  }, []);

  if (!user) return <NotFound />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Header />
      <h1 className="flex w-[90%] gap-2 text-left font-nohemiLight text-3xl">
        Üdvözlünk, <span className="text-sky-200">{user?.displayName}</span>
      </h1>
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-4 rounded-lg border-2 border-sky-950 bg-black/20 p-4 shadow-md backdrop-blur-md">
        <div className="flex w-full items-center justify-center">
          <Categories values={categories} />
          <Transactions values={categories} />
        </div>
        <Checkout categories={categories} transactions={transactions} />
      </div>
      <Spotlight />
    </div>
  );
};

export default Dashboard;
