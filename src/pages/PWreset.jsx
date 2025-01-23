import React from "react";
import { Link } from "react-router-dom";
import { Spotlight } from "../components/Spotlight";

export const PWreset = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form className="flex h-fit flex-col items-center justify-center gap-2 rounded-lg border-2 border-sky-800 bg-black/20 p-4 shadow-md backdrop-blur-md">
        <h1 className="mb-2 font-nohemi text-4xl">Reset Your Password</h1>
        <input
          type="text"
          id="email"
          className="w-fit max-w-[300px] rounded-lg bg-black/30 py-1 text-center font-nohemiLight text-2xl text-white shadow-md outline-none"
          placeholder="Your Email"
        />
        <button className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-2xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200">
          Reset
        </button>
        <Link to={"/"} className="font-nohemiLight text-lg font-bold">
          Back to <span className="text-sky-400">homepage.</span>
        </Link>
      </form>
      <Spotlight />
    </div>
  );
};
