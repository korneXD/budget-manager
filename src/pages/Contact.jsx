import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

export const Contact = () => {
  const testimonials = [
    {
      quote: "",
      name: "Rácz Patrik",
      designation: "Fejlesztő",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tKw9ZmM8JdtzI93vqScTACarW4Qfo0L1gP5pB",
    },
    {
      quote: "",
      name: "Halmosi Kornél",
      designation: "Fejlesztő",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tB74mCatL1bIGRagnhSAi8Yfuv6r2JeXw5lqs",
    },
    {
      quote: "",
      name: "Vincze Dániel",
      designation: "Fejlesztő",
      src: "https://z91p97z26q.ufs.sh/f/kJZWr7GeXU2tz4xDRtW6zkHhCl9Bu8NADdgiExW3JaSoR175",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
      <Spotlight />
    </>
  );
};
