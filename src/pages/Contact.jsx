import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";

export const Contact = () => {
  const testimonials = [
    {
      name: "Rácz Patrik",
      designation: "Fejlesztő",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tKw9ZmM8JdtzI93vqScTACarW4Qfo0L1gP5pB",
    },
    {
      name: "Halmosi Kornél",
      designation: "Fejlesztő",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tB74mCatL1bIGRagnhSAi8Yfuv6r2JeXw5lqs",
    },
    {
      name: "Vincze Dániel",
      designation: "Fejlesztő",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tz4xDRtW6zkHhCl9Bu8NADdgiExW3JaSoR175",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-10">
        {testimonials && (
          <div className="grid h-full w-full grid-cols-3 items-center justify-center gap-10">
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
                <p className="font-nohemiLight text-xl italic tracking-wide">
                  {e.designation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Spotlight />
    </>
  );
};
