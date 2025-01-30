import React, { useEffect } from "react";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";

const Settings = () => {
  const { user } = useContext(UserContext);
  const currencies = [{ name: "euro" }, { name: "forint" }, { name: "dollar" }];
  useEffect(() => {
    document.title = "Budget Manager | Beállítások";
  }, []);
  if (!user) return <NotFound />;
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <Header />
      <h1 className="font-nohemi text-2xl text-sky-200">Beállítások</h1>
      <Spotlight />
    </div>
  );
};

export default Settings;
