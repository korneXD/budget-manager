import React from "react";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Budget Manager | Not Found";
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <Navbar />
      <h1 className="font-nohemi text-6xl text-sky-200">Oops!</h1>
      <p className="font-nohemiLight text-xl">
        <span className="font-nohemi">404</span> - This page is outside of the
        universe
      </p>
      <Link
        to={"/"}
        className="rounded-xl bg-sky-600 px-2 font-nohemi text-2xl text-sky-200"
      >
        Back to home
      </Link>
      <Spotlight />
    </div>
  );
};

export default NotFound;
