import { Link } from "react-router-dom";

const Footer = () => {
  const routes = [
    { name: "Miért válassz minket?", path: "/whychooseus" },
    { name: "Jellemzők", path: "/features" },
    { name: "Tippek", path: "/tips" },
    { name: "Elérhetőség", path: "/contact" },
    { name: "Gyakori kérdések", path: "/faq" },
  ];
  return (
    <footer className="mt-10 flex h-fit w-full max-w-5xl flex-col items-center justify-center font-nohemiLight">
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        {routes.map((route) => (
          <Link className="w-full flex-1 text-center" href={route.path}>
            {route.name}
          </Link>
        ))}
      </div>
      <p className="mt-12">Budget Manager &copy; 2025</p>
    </footer>
  );
};

export default Footer;
