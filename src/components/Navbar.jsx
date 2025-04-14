import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const navLinks = [
    { name: "Miért válassz minket?", path: "/whychooseus" },
    { name: "Jellemzők", path: "/features" },
    { name: "Tippek", path: "/tips" },
    { name: "Elérhetőség", path: "/contact" },
    { name: "Gyakori kérdések", path: "/faq" },
  ];

  const location = useLocation();
  const redirectHome = location.pathname != "/";

  const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  return (
    <nav
      className={
        redirectHome
          ? "fixed left-0 top-0 z-50 flex h-fit w-full flex-col items-center justify-center border-b-2 border-sky-950 backdrop-blur-sm md:pt-8"
          : "fixed left-0 top-0 z-50 flex h-fit w-full flex-col items-center justify-center border-b-2 border-sky-950 pb-6 backdrop-blur-sm md:pt-8"
      }
    >
      <div className="hidden h-fit w-full items-center justify-center md:flex">
        <div className="flex w-full items-center justify-around">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex-1 flex-grow cursor-pointer text-center font-nohemiLight text-sm uppercase tracking-widest text-sky-200 transition-all hover:text-sky-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile */}
      <div className="flex w-full items-center justify-between px-6 py-4 md:hidden">
        <h1 className="w-full flex-1 text-center font-nohemi text-xl italic text-sky-400">
          Budget Manager
        </h1>
        <div className="flex-1 text-right">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border-2 border-sky-950 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-sky-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </button>
        </div>
        {open && (
          <div className="flex items-center justify-center">
            <div className="absolute right-0 top-0 z-10 flex min-h-screen w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-sky-950 bg-black px-6 text-center shadow-md backdrop-blur-sm">
              <button
                className="absolute right-6 top-4"
                onClick={() => setOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7 text-sky-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {navLinks.map((e) => (
                <Link
                  to={e.path}
                  key={e.name}
                  onClick={() => setOpen(false)}
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg py-2 text-center font-nohemiLight text-lg uppercase tracking-widest text-sky-200 transition-all hover:text-sky-500"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {redirectHome && (
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex w-full items-center justify-start gap-2 border-sky-950 px-8 md:border-b-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 stroke-1 text-sky-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <span className="font-nohemiLight text-sky-200">
            {user ? "kezelőpanel" : "főoldal"}
          </span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
