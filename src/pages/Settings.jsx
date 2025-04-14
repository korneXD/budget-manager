import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import { Context } from "../context/Context";
import { updateCurrency } from "../utility/crudUtility";
import { toast } from "sonner";
import Footer from "../components/Footer";

const Settings = () => {
  const [currencyName, setCurrency] = useState("");
  const [newCurrency, setNewCurrency] = useState("");
  const { user } = useContext(UserContext);
  const { settings } = useContext(Context);
  const currencies = [
    { name: "EUR" },
    { name: "USD" },
    { name: "HUF" },
    { name: "GBP" },
  ];

  useEffect(() => {
    settings?.map((e) => {
      if (e.id == user.uid) setCurrency(e.currency);
    });
  }, [settings, user]);

  useEffect(() => {
    if (newCurrency && settings) {
      try {
        settings?.map((e) => {
          if (e.id == user.uid) updateCurrency(e.id, newCurrency);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [newCurrency, user, settings]);

  const selectCurrency = (e) => {
    setNewCurrency(e);
  };

  useEffect(() => {
    document.title = "Money Map | Beállítások";
  }, []);
  if (!user) return <NotFound />;
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
        <Header />
        <h1 className="font-nohemi text-2xl tracking-wide text-sky-200">
          Beállítások
        </h1>
        <div className="flex flex-row items-center justify-center gap-4">
          {currencies.map((e) => (
            <div
              key={e.name}
              onClick={() => toast.warning("Egyenlőre nem elérhető...")}
              className="cursor-pointer"
            >
              <img
                src={`/${e.name.toLowerCase()}.svg`}
                alt={e.name}
                className="size-12 rounded-full border-2 border-sky-950 bg-black/20 shadow-md backdrop-blur-sm"
              />
            </div>
          ))}
        </div>
        <p className="font-nohemiLight text-2xl text-white">
          Jelenlegi pénznem :{" "}
          <span className="text-sky-200">
            {currencyName == "" ? "Nincs kiválasztva " : currencyName}
          </span>
        </p>
        <Spotlight />
      </div>
      <div className="flex items-center justify-center">
        <Footer />
      </div>
    </>
  );
};

export default Settings;
