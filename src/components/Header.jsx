import { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RxAvatar } from "react-icons/rx";
import { extractUrlAndId } from "../utility/utils";

const Header = () => {
  const { user, logOut } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    !user && setAvatar(null);
  }, [user, user?.photoURL]);

  return (
    <div>
      <nav className="bg-black fixed w-full top-0 z-50 shadow-lg py-4 px-6 border-b">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-white text-xl font-bold">
            {/* Logo or brand */}
          </NavLink>

          <div className="flex">
            {user && (
              <div className="flex justify-center items-center gap-4">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transactions">Transactions</Link>
              </div>
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
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
