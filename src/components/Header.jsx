import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";
import { useState } from "react";
import { extractUrlAndId } from "../utility/utils";

const Header = () => {
  const { user, logOut, msg, setMsg } = useContext(UserContext);

  const navigate = useNavigate();

  const path = useLocation();

  const [avatar, setAvatar] = useState(null);

  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "kezelőpanel", path: "/dashboard" },
    { name: "célok", path: "/targets" },
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
      if (user?.photoURL != null) {
        if (extractUrlAndId(user.photoURL).url) {
          fetch(extractUrlAndId(user.photoURL).url)
            .then((response) => {
              if (response.ok) {
                setAvatar(extractUrlAndId(user.photoURL).url);
              } else {
                setAvatar(null);
              }
            })
            .catch((error) => {
              console.log("Hiba a kép betöltésekor");
            });
        } else {
          console.log("Hiba a kép URL-jében");
          setAvatar(null);
        }
      } else {
        setAvatar(null);
      }
    }
  }, [user]);

  return (
    <nav className="fixed top-0 z-50 w-full select-none border-b border-b-sky-950 bg-black/30 px-6 py-4 shadow-lg backdrop-blur-sm">
      {/* Desktop */}
      <div className="hidden items-center justify-between md:flex">
        <div className="flex w-full items-center justify-center">
          {user && (
            <div className="flex w-full items-center justify-around gap-8">
              {navLinks.map((e) => (
                <Link
                  to={e.path}
                  key={e.name}
                  className={
                    e.path == path.pathname
                      ? "flex-1 flex-grow cursor-pointer text-center font-nohemiLight text-sm uppercase tracking-widest text-sky-400 transition-all"
                      : "flex-1 flex-grow cursor-pointer text-center font-nohemiLight text-sm uppercase tracking-widest text-sky-200 transition-all hover:text-sky-500"
                  }
                >
                  {e.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="items-center justify-center space-x-4 md:flex">
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
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleLogout}
                className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-lg uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
              >
                Kijelentkezés
              </button>
              <Link
                to={"/profile"}
                className="flex size-12 items-center justify-center"
              >
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
            </div>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="flex w-full items-center justify-end md:hidden">
        <p className="w-full text-left font-nohemi text-xl italic text-sky-400">
          Budget Manager
        </p>
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
                  className={
                    e.path == path.pathname
                      ? "flex w-full cursor-pointer items-center justify-center rounded-lg py-2 text-center font-nohemiLight text-lg uppercase tracking-widest text-sky-400 transition-all"
                      : "flex w-full cursor-pointer items-center justify-center rounded-lg py-2 text-center font-nohemiLight text-lg uppercase tracking-widest text-sky-200 transition-all hover:text-sky-500"
                  }
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
