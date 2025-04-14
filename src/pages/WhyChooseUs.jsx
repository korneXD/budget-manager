import React, { useEffect } from "react";
import {
  Globe,
  Anchor,
  Hourglass,
  Database,
  HardDriveUpload,
  Camera,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import Footer from "../components/Footer";

export const WhyChooseUs = () => {
  useEffect(() => {
    document.title = "Money Map | Miért válassz minket?";
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Modern Dizájn",
      description:
        "A legújabb technológiát használjuk, hogy megfeleljünk az emberek igényeinek.",
    },
    {
      icon: Anchor,
      title: "Kreatív Dizájn",
      description:
        "Mindig meghallgatjuk ügyfeleinket, és a legjobb dizájnokat hozzuk létre.",
    },
    {
      icon: Hourglass,
      title: "Ügyfélszolgálat",
      description: "Mindig örömmel segítünk ügyfeleinknek bármilyen kérdésben.",
    },
    {
      icon: Database,
      title: "Üzleti Növekedés",
      description: "A siker folyamatos fejlődésből és javulásból fakad.",
    },
    {
      icon: HardDriveUpload,
      title: "Piaci Stratégia",
      description:
        "Innovatív stratégiákat alkalmazunk, hogy az élen maradjunk a piacon.",
    },
    {
      icon: Camera,
      title: "Ingyenes",
      description: "Kiváló minőségű szolgáltatásokat nyújtunk ingyen.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="relative z-0 mb-12 flex min-h-screen flex-col items-center md:mt-16">
        <div className="container mx-auto w-full px-6 pt-12">
          <div className="mb-12 text-center">
            <h4 className="inline-block font-nohemi text-3xl font-bold text-sky-400">
              Miért válassz <span className="italic text-white">minket?</span>
            </h4>
            <p className="mx-auto mt-4 max-w-4xl font-nohemiLight tracking-wide text-white">
              "Amikor minket választasz, érezni fogod az 5 év webfejlesztési
              tapasztalatának előnyét. Ismerjük a digitális világot, és tudjuk,
              hogyan kell kezelni. Gyakorlati ismeretekkel rendelkezünk az
              online jelenlét, a SEO és a közösségi média területén."
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl border-2 border-sky-950 bg-black/30 p-6 text-center shadow-lg backdrop-blur-sm"
              >
                <Icon className="mb-4 text-4xl text-sky-400" size={48} />
                <h6 className="font-nohemi text-xl font-semibold text-sky-400">
                  {title}
                </h6>
                <p className="font-nohemiLight tracking-wide text-white">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
      <Spotlight />
    </div>
  );
}; 
