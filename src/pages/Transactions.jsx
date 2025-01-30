import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
import NotFound from "./NotFound";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Spotlight } from "../components/Spotlight";

const Transactions = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    document.title = "Budget Manager | Tranzakciók";
  }, []);

  if (!user) return <NotFound />;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Header />
      <h1 className="font-nohemi text-2xl text-sky-200">Transactions</h1>
      <Spotlight />
    </div>
  );
};

export default Transactions;
