import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import { useEffect } from "react";

export const Homepage = () => {
  useEffect(() => {
    document.title = "Budget Manager";
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <Navbar />
      <h1 className="font-nohemi text-6xl text-sky-200">You need a budget!</h1>
      <span className="font-nohemiLight text-2xl font-extralight uppercase tracking-wider text-sky-300">
        Take control of your money
      </span>
      <div className="flex flex-row items-center justify-center gap-4">
        <Link
          to="/auth/in"
          className="my-6 rounded-xl border-2 border-sky-900 bg-sky-600 px-3 py-1 font-nohemi text-2xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-900"
        >
          Login
        </Link>
        <Link
          to="/auth/up"
          className="my-6 rounded-xl border-2 border-sky-600 bg-sky-800 px-3 py-1 font-nohemi text-2xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        >
          Sign up
        </Link>
      </div>
      <Spotlight />
    </main>
  );
};
