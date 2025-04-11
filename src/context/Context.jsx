import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  readCategories,
  readSettings,
  readTargets,
  readTransactions,
} from "../utility/crudUtility";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [settings, setSettings] = useState(null);
  const [targets, setTargets] = useState(null);

  useEffect(() => {
    readCategories(setCategories);
    readTransactions(setTransactions);
    readSettings(setSettings);
    readTargets(setTargets);
  }, []);

  return (
    <Context.Provider value={{ categories, transactions, settings, targets }}>
      {children}
    </Context.Provider>
  );
};
