import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import Targets from "../components/Targets";
import Footer from "../components/Footer";
import { useEffect } from "react";

export const TargetPage = () => {
  useEffect(() => {
    document.title = "Money Map | Célok";
  }, []);

  return (
    <>
      <div className="flex min-h-screen items-start justify-center">
        <Header />
        <div className="flex flex-col items-center justify-center gap-12 pt-32">
          <Targets />
          <p className="font-nohemiLight">
            A célok eredményeit a Statisztika oldalon találod.
          </p>
        </div>
        <Spotlight />
      </div>
      <div className="flex h-fit w-full items-center justify-center">
        <Footer />
      </div>
    </>
  );
};
