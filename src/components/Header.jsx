import { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RxAvatar } from "react-icons/rx";
import { extractUrlAndId } from "../utility/utils";

const Header = () => {
  const { user, logOut, msg, setMsg } = useContext(UserContext);

  useEffect(() => {
    setMsg({});
  }, []);

  useEffect(() => {
    if (msg?.logout) console.log(msg?.logout);
  }, [msg]);

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    !user && setAvatar(null);
  }, [user, user?.photoURL]);

  const navLinks = [
    { name: "kezelőpanel", path: "/dashboard" },
    { name: "tranzakciók", path: "/transactions" },
    { name: "eredmények", path: "/transactions" },
    { name: "beállítások", path: "/transactions" },
  ];

  const handleLogout = () => {
    setMsg({ err: null });
    logOut();
    console.log(msg?.logout ? msg.logout : msg?.logout);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/30 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-center">
          {user && (
            <div className="flex w-full items-center justify-around gap-8">
              {navLinks.map((e) => (
                <Link
                  to={e.path}
                  key={e.name}
                  className="flex-1 flex-grow cursor-pointer text-center font-nohemiLight text-sm uppercase tracking-widest text-sky-200 transition-all hover:text-sky-500"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="items-center space-x-4 md:flex">
          {!user ? (
            <>
              <Link
                to={"/auth/in"}
                className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-lg uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
              >
                Belépés
              </Link>
              <Link
                to={"/auth/up"}
                className="my-6 rounded-xl border-2 border-sky-600 bg-sky-800 px-3 py-1 font-nohemi text-lg uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
              >
                Regisztráció
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/"}
                onClick={handleLogout}
                className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-lg uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
              >
                Kijelentkezés
              </Link>
              <Link to={"/profile"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 text-sky-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;