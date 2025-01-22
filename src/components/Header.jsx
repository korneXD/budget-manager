import React, { useState, useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RxAvatar } from "react-icons/rx";
import { extractUrlAndId } from "../utility/utils";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    !user && setAvatar(null);
  }, [user, user?.photoURL]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <nav className="bg-black fixed w-full top-0 z-50 shadow-lg py-4 px-6">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-white text-xl font-bold">
            {/* Logo or brand */}
          </NavLink>

          <button
            className="text-white md:hidden"
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className={`${isOpen ? "block" : "hidden"} md:flex space-x-4`}>
            <NavLink
              to="/"
              className="text-white text-lg font-medium py-2 px-4 hover:text-[#ff8a00] transition-colors duration-300"
            >
              Főoldal
            </NavLink>
            <NavLink
              to="/posts"
              className="text-white text-lg font-medium py-2 px-4 hover:text-[#ff8a00] transition-colors duration-300"
            >
              Posztok
            </NavLink>
            {user && (
              <NavLink
                to="/create"
                className="text-white text-lg font-medium py-2 px-4 hover:text-[#ff8a00] transition-colors duration-300"
              >
                Új bejegyzés
              </NavLink>
            )}
          </div>

          <div className="md:flex items-center space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/auth/in"
                  className="bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white py-2 px-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-[#e52e71] hover:to-[#ff8a00]"
                >
                  Belépés
                </NavLink>
                <NavLink
                  to="/auth/up"
                  className="bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white py-2 px-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-[#e52e71] hover:to-[#ff8a00]"
                >
                  Regisztráció
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  onClick={() => logOut()}
                  className="bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white py-2 px-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-[#e52e71] hover:to-[#ff8a00]"
                >
                  Kijelentkezés
                </NavLink>

                <div className="relative">
                  <button className="bg-black p-2 rounded-full focus:outline-none transition-all">
                    {avatar ? (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={avatar}
                        alt="User Avatar"
                      />
                    ) : (
                      <RxAvatar className="text-white text-2xl" />
                    )}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <NavLink
                      to="/profile"
                      className="block text-black py-2 px-4 hover:bg-gray-200"
                    >
                      Személyes adatok
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
