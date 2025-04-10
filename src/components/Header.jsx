import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";
import { useState } from "react";
import { extractUrlAndId } from "../utility/utils";

const Header = () => {
  const { user, logOut, msg, setMsg } = useContext(UserContext);

  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);

  const navLinks = [
    { name: "kezelőpanel", path: "/dashboard" },
    { name: "statisztika", path: "/statistics" },
    { name: "beállítások", path: "/settings" },
  ];

  useEffect(() => {
    if (msg?.logout) {
      navigate("/");
      toast.success(msg.logout);
    } else if (msg?.err) {
      toast.error(msg.err);
    }
  }, [msg]);

  const handleLogout = () => {
    try {
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      setAvatar(extractUrlAndId(user.photoURL).url);
    }
  }, [user]);

  return (
    <nav className="fixed top-0 z-50 w-full select-none border-b border-b-sky-950 bg-black/30 px-6 py-4 shadow-lg backdrop-blur-sm">
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
              <button
                onClick={handleLogout}
                className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-lg uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
              >
                Kijelentkezés
              </button>
              <Link to={"/profile"} className="size-12">
                {!avatar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 select-none text-sky-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <img
                    src={avatar}
                    className="pointer-events-none aspect-square size-12 rounded-full border-2 border-sky-950 bg-white/20 shadow-md backdrop-blur-sm"
                  />
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
