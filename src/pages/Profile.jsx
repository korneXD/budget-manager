import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";
import { extractUrlAndId } from "../utility/utils";
import { uploadFile } from "../utility/UploadFile";
import { useRef } from "react";

export const Profile = () => {
  const { user, deleteAccount, updateCredentials, logOut, msg } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

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

  useEffect(() => {
    if (user?.photoURL) {
      setAvatar(extractUrlAndId(user.photoURL).url);
    }
  }, [user]);

  const imageinputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const file = data?.file ? data?.file[0] : null;
      const { url, id } = file ? await uploadFile(file) : null;
      updateCredentials(data.displayName, url + "/" + id);
    } catch (error) {
      toast.warning("Nincs fájl kiválasztva!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 pt-20">
      <Header />
      <h1 className="font-nohemi text-2xl tracking-wide text-sky-200">
        Profil kezelés
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <div>
          <input
            type="file"
            ref={imageinputRef}
            hidden
            {...register("file", {
              validate: (value) => {
                if (!value[0]) return true;
                const fileExtension = value[0]?.name
                  .split(".")
                  .pop()
                  .toLowerCase();
                const acceptedFormates = ["jpg", "png"];
                if (!acceptedFormates.includes(fileExtension))
                  return "Invalid file format!";
                if (value[0].size > 1 * 1000 * 1024)
                  return "Az engedélyezett fájl mérete 1MB";
                return true;
              },
            })}
            onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
            className="flex appearance-none bg-black font-nohemiLight"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <p className="text-danger" style={{ fontSize: "12px", color: "red" }}>
            {errors?.file?.message}
          </p>
        </div>
        <input
          type="submit"
          className="text-md my-2 cursor-pointer rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        />
      </form>
      {avatar && (
        <img
          src={avatar}
          className="pointer-events-none rounded-full border-4 border-sky-950 bg-black shadow-md"
          style={{
            marginTop: "15px",
            maxWidth: "300px",
            maxHeight: "300px",
            objectFit: "cover",
          }}
        />
      )}
      <p className="font-nohemiLight text-xl">
        {avatar ? "Jelenlegi profilképed" : "Nincs profilképed"}
      </p>
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
        Fiók törlése
      </button>

      <Spotlight />
    </div>
  );
};
