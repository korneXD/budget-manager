import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Spotlight } from "../components/Spotlight";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { toast } from "sonner";

export const Auth = () => {
  const { signInUser, signUpUser, msg, setMsg } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isSignIn = location.pathname === "/auth/in";

  useEffect(() => {
    if (isSignIn) {
      document.title = "Budget Manager | Belépés";
    } else if (!isSignIn) {
      document.title = "Budget Manager | Regisztráció";
    }
  }, [isSignIn]);

  useEffect(() => {
    if (msg?.signin || msg?.signup) {
      navigate("/dashboard");
      toast.success(msg.signin || msg.signup);
    } else if (msg?.err) {
      toast.error(msg.err);
    }
  }, [msg, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (isSignIn) {
      signInUser(data.get("email"), data.get("password"));
    } else {
      signUpUser(
        data.get("email"),
        data.get("displayName"),
        data.get("password"),
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="flex h-[408px] w-fit flex-col items-center justify-center gap-2 rounded-lg border-2 border-sky-950 bg-black/20 p-4 shadow-md backdrop-blur-md"
      >
        <h1 className="mb-2 font-nohemi text-4xl">
          {isSignIn ? <p>Login</p> : <p>Sign Up</p>}
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="email"
            name="email"
            required
            className="max-w-[250px] rounded-lg bg-black/30 py-1 text-center font-nohemiLight text-2xl text-white shadow-md outline-none"
            placeholder="Your Email"
          />
          {!isSignIn && (
            <input
              type="text"
              name="displayName"
              required
              className="max-w-[250px] rounded-lg bg-black/30 py-1 text-center font-nohemiLight text-2xl text-white shadow-md outline-none"
              placeholder="Your Username"
            />
          )}
          <input
            type="password"
            name="password"
            required
            className="max-w-[250px] rounded-lg bg-black/30 py-1 text-center font-nohemiLight text-2xl text-white shadow-md outline-none"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-2xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        >
          {isSignIn ? <p>Login</p> : <p>Sign Up</p>}
        </button>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="font-nohemiLight text-xl">
              {isSignIn ? (
                <div className="flex">
                  <p>Don&apos;t have an account?</p>
                </div>
              ) : (
                <p>Already have an account?</p>
              )}
            </span>
            <Link
              to={isSignIn ? "/auth/up" : "/auth/in"}
              className="font-nohemi text-xl text-sky-200 transition-all hover:text-sky-300"
            >
              {isSignIn ? <p>Sign Up</p> : <p>Login</p>}
            </Link>
          </div>
          {isSignIn && (
            <Link to={"/reset"} className="font-nohemiLight text-lg">
              Forgot your password?
            </Link>
          )}
        </div>
      </form>
      <Spotlight />
    </div>
  );
};
