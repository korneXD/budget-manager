import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import Footer from "../components/Footer";

export const Features = () => {
  useEffect(() => {
    document.title = "Money Map | Jellemzők";
  }, []);

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
      name: "Tippek",
      desc: "Ezen az oldalon találsz költségvetési tippeket/segédletet.",
    },
    {
      name: "Gyakori kérdések",
      desc: "Ezene az oldalon megtalálod a leggyakoribb kérdéseket az oldallal kapcsolatban.",
    },
    {
      name: "Elérhetőség",
      desc: "Ezen az oldalon megtalálod minden elérhetőségünket.",
    },
    {
      name: "Miért válassz minket?",
      desc: "Ezen az oldalon megtudhatod miért érdemes a mi oldalunkat használnod.",
    },
  ];

  return (
    <>
      <Navbar />
      <section
        id="features"
        className="mt-32 flex min-h-screen w-full flex-col items-center justify-center md:mt-12"
      >
        <h2 className="font-nohemi text-3xl text-white">
          Az oldal <span className="text-sky-400">Jellemzői</span>
        </h2>
        <div className="mt-12 grid w-11/12 grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex h-full w-[90%] flex-col items-center justify-center gap-4 rounded-lg border-2 border-sky-950 bg-black/30 p-4 font-nohemi shadow-md backdrop-blur-sm"
            >
              <h4 className="text-2xl font-semibold text-sky-400">
                {feature.name}
              </h4>
              <p className="mt-2 font-nohemiLight text-white">{feature.desc}</p> 
            </div>
          ))}
        </div>
        <Footer />
      </section>
      <Spotlight />
    </>
  );
};             