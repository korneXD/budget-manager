import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { readCategories, readTransactions } from "../utility/crudUtility";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    readCategories(setCategories);
    readTransactions(setTransactions);
  }, []);

  return (
    <Context.Provider value={{ categories, transactions }}>
      {children}
    </Context.Provider>
  );
};
