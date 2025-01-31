import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import { Context } from "../context/Context";
import { updateCurrency } from "../utility/crudUtility";

const Settings = () => {
    const [currencyName, setCurrency] = useState("");
  const { user } = useContext(UserContext);
    const { settings } = useContext(Context);
   const currencies = [
     { name: "EUR" },
     { name: "USD" },
     { name: "HUF" },
     { name: "GBP" },
   ];
    useEffect(() => {
       if (settings && user.uid == settings[0].id) {  
         setCurrency(settings[0].currency);
       }
     }, [settings,user]);

       

  useEffect(() => {
    if (settings && user.uid == settings[0].id && settings[0].currency != currencyName) {
      try {
        updateCurrency(settings[0].id, currencyName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [currencyName, user]);
   

  const selectCurrency = (e) => {
    setCurrency(e);
  };

  useEffect(() => {
    document.title = "Budget Manager | Beállítások";
  }, []);
  if (!user) return <NotFound />;
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <Header />
      <h1 className="font-nohemi text-2xl text-sky-200">Beállítások</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        {currencies.map((e) => (
          <p key={e.name} onClick={() => selectCurrency(e.name)}>
            {e.name}
          </p>
        ))}
      </div>
      <p>Jelenlegi pénznem : {currencyName == "" ? "Nincs kiválasztva " : currencyName}</p>
      <Spotlight />
    </div>
  );
};

export default Settings;
