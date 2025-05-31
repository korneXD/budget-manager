import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import { useEffect } from "react";

export const Contact = () => {
  useEffect(() => {
    document.title = "Money Map | Elérhetőség";
  }, []);

  const testimonials = [
    {
      name: "Rácz Patrik",
      designation: "Backend, frontend",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2twdfMk9RWIe93imrxLVzQ5h21jJGakRKXvO6s",
      github: "https://github.com/Patrik930",
    },
    {
      name: "Halmosi Kornél",
      designation: "Frontend, backend",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tB74mCatL1bIGRagnhSAi8Yfuv6r2JeXw5lqs",
      github: "https://github.com/korneXD",
    },
    {
      name: "Vincze Dániel",
      designation: "Szövegírás, tesztelés, frontend design",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tDjVnpZccHsj6aqMl1ZuQBmVDWwE0KG5P3YoF",
      github: "https://github.com/VinczeDaniel2",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-10 pt-32">
        {testimonials && (
          <div className="grid h-full w-full grid-cols-1 items-center justify-center gap-10 md:grid-cols-3">
            {testimonials.map((e, i) => (
              <div
                key={i}
                className="flex grid-cols-1 flex-col items-center justify-center gap-2 rounded-xl border-2 border-sky-950 bg-black/30 py-4 backdrop-blur-sm"
              >
                <h1 className="font-nohemi text-2xl tracking-wide">{e.name}</h1>
                <img
                  src={e.src}
                  alt={e.name}
                  className="h-80 rounded-xl border-2 border-sky-950 object-contain"
                />
                <p className="text-center font-nohemiLight text-xl italic tracking-wide">
                  {e.designation}
                </p>
                <Link to={e.github} target="_blank">
                  <img
                    src="./github.svg"
                    alt="Github"
                    className="size-8 rounded-full border-2 border-sky-950 bg-sky-800"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Spotlight />
    </>
  );
};
