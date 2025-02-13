import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Why Choose Us", path: "/whychooseus" },
    { name: "Features", path: "/features" },
    { name: "Budget Tips", path: "/tips" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const location = useLocation();
  const redirectHome = location.pathname != "/";

  return (
    <nav className="fixed left-0 top-0 flex h-fit w-full flex-col items-center justify-center">
      <div className="flex h-fit w-full items-center justify-center py-6">
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
      {redirectHome && (
        <Link
          to="/"
          className="flex w-full items-center justify-start gap-2 px-8"
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

          <span className="font-nohemiLight text-sky-200">homepage</span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
