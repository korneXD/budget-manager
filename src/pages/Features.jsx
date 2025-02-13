import React from "react";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";

export const Features = () => {
  const features = [
    {
      name: "Kezelőpanel",
      desc: "Ezen az oldalon tudsz hozzádni illetve törölni tranzakciókat.",
    },
    {
      name: "Beállítások",
      desc: "Ezen az oldalon tudsz pénznemet beállítani.",
    },
    {
      name: "Budget Tips",
      desc: "Ezen az oldalon találsz költségvetési tippeket/segédletet.",
    },
    {
      name: "Faq",
      desc: "Ezene az oldalon megtalálod a leggyakoribb kérdéseket az oldallal kapcsolatban.",
    },
    {
      name: "Contact",
      desc: "Ezen az oldalon megtalálod minden elérhetőségünket.",
    },
    {
      name: "Why Choose Us",
      desc: "Ezen az oldalon megtudhatod miért érdemes a mi oldalunkat használnod.",
    },
  ];

  return (
    <>
    <Navbar/>
        <section id="features" className="min-h-screen w-full flex flex-col items-center justify-center">
      <h2 className="text-6xl font-nohemi text-sky-200">Our <span className="text-sky-300">Features</span></h2>
      <span className="text-2xl font-nohemiLight uppercase tracking-wider text-sky-600">Explore our tools</span>
      <div className="mt-12 grid w-11/12 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="flex h-full w-[90%] flex-col items-center justify-center gap-4 rounded-lg border-2 border-sky-950 bg-black/20 p-4 shadow-md backdrop-blur-md">
            <h4 className="text-2xl font-semibold text-white">{feature.name}</h4>
            <p className="text-white mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
    <Spotlight/>
    </>

  );
};
