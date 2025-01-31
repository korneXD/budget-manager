import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";

export const Profile = () => {
  const { user, deleteAccount, logOut, msg } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Budget Manager | Profil";
  }, []);

  useEffect(() => {
    if (msg?.deleteUser) {
      logOut();
      toast.success(msg.deleteUser);
      navigate("/");
    } else if (msg?.err) {
      toast.error(msg.err);
    }
  }, [msg, navigate]);

  const handleDelete = () => {
    try {
      deleteAccount();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <NotFound />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <Header />
      <h1 className="font-nohemi text-2xl tracking-wide text-sky-200">
        Profile Management
      </h1>
      <p className="font-nohemiLight text-xl">Itt lesz a profilkép</p>
      <div className="flex flex-row items-center justify-center gap-2 text-xl">
        <p className="font-nohemiLight">Felhasználóneved: </p>
        <span className="font-nohemiLight text-sky-200">
          {user?.displayName}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="rounded-lg border-2 border-sky-950 bg-red-600/90 px-2 font-nohemi text-xl tracking-wide text-white shadow-md backdrop-blur-sm"
      >
        Delete Account
      </button>
      <Spotlight />
    </div>
  );
};
