import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";

const Results = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    document.title = "Budget Manager | Eredmények";
  }, []);
  if (!user) return <NotFound />;
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Header />
      <h1 className="font-nohemi text-2xl text-sky-200">Eredmények</h1>
      <Spotlight />
    </div>
  );
};

export default Results;
