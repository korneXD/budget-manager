import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { readCategories } from "../utility/crudUtility";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    readCategories(setCategories);
  }, []);

  return <Context.Provider value={{ categories }}>{children}</Context.Provider>;
};
