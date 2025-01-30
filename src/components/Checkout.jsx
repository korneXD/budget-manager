import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Checkout = ({ categories, transactions }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-center">
      <h1>Checkout</h1>
    </div>
  );
};

export default Checkout;
