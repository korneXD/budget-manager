import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { readCategories, readExpenses } from "../utility/crudUtility";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    readCategories(setCategories);
    readExpenses(setExpenses);
  }, []);

  return (
    <Context.Provider value={{ categories, expenses }}>
      {children}
    </Context.Provider>
  );
};
