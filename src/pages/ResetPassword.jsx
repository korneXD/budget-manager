import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spotlight } from "../components/Spotlight";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";

export const ResetPassword = () => {
  useEffect(() => {
    document.title = "Budget Manager | Jelszó visszaállítás";
  }, []);

  const navigate = useNavigate();
  const { msg, resetPassword, setMsg } = useContext(UserContext);

  useEffect(() => {
    if (msg?.resetPw) {
      toast.success(msg.resetPw);
      setMsg({});
      navigate("/auth/in", { replace: true });
    } else if (msg?.err) {
      toast.error(msg.err);
      setMsg({});
    }
  }, [msg, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    resetPassword(data.get("email"));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="flex h-fit flex-col items-center justify-center gap-2 rounded-lg border-2 border-sky-800 bg-black/20 p-4 shadow-md backdrop-blur-md"
      >
        <h1 className="mb-2 font-nohemi text-4xl">Reset Your Password</h1>
        <input
          type="text"
          id="email"
          name="email"
          className="w-fit max-w-[300px] rounded-lg bg-black/30 py-1 text-center font-nohemiLight text-2xl text-white shadow-md outline-none"
          placeholder="Your Email"
        />
        <button
          type="submit"
          className="my-2 rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-2xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        >
          Reset
        </button>
        <Link to={"/"} className="font-nohemiLight text-lg font-bold">
          Back to <span className="text-sky-400">homepage.</span>
        </Link>
      </form>
      <Spotlight />
    </div>
  );
};
