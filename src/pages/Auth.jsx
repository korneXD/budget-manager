import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Spotlight } from "../components/Spotlight";

export const Auth = () => {
  const { signInUser, signUpUser } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isSignIn = location.pathname === "/auth/in";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignIn) {
      signInUser(data.get("email"), data.get("password"));
      navigate("/dashboard");
    } else {
      signUpUser(
        data.get("email"),
        data.get("displayName"),
        data.get("password")
      );
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex h-[408px] w-fit flex-col items-center justify-center gap-2 rounded-lg border-2 border-sky-950 bg-black/20 p-4 shadow-md backdrop-blur-md"
      >
        <h1 className="font-nohemi mb-2 text-4xl">
          {isSignIn ? <p>Login</p> : <p>Sign Up</p>}
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="email"
            name="email"
            className="font-nohemiLight max-w-[250px] rounded-lg bg-black/30 py-1 text-center text-2xl text-white shadow-md outline-none"
            placeholder="Your Email"
          />
          {!isSignIn && (
            <input
              type="text"
              name="displayName"
              className="font-nohemiLight max-w-[250px] rounded-lg bg-black/30 py-1 text-center text-2xl text-white shadow-md outline-none"
              placeholder="Your Username"
            />
          )}
          <input
            type="password"
            name="password"
            className="font-nohemiLight max-w-[250px] rounded-lg bg-black/30 py-1 text-center text-2xl text-white shadow-md outline-none"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="font-nohemi my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 text-2xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        >
          {isSignIn ? <p>Login</p> : <p>Sign Up</p>}
        </button>
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="font-nohemiLight text-xl">
            {isSignIn ? (
              <p>Don&apos;t have an account?</p>
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
      </form>
      <Spotlight />
    </div>
  );
};
