import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  readCategories,
  readSettings,
  readTransactions,
} from "../utility/crudUtility";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    readCategories(setCategories);
    readTransactions(setTransactions);
    readSettings(setSettings);
  }, []);

  return (
    <Context.Provider value={{ categories, transactions, settings }}>
      {children}
    </Context.Provider>
  );
};
