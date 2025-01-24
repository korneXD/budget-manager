import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Context } from "../context/Context";
import Header from "../components/Header";
import NotFound from "../pages/NotFound";
import { useState } from "react";
import { addCateg } from "../utility/crudUtility";
import { Spotlight } from "../components/Spotlight";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { categories } = useContext(Context);
  const [categName, setCategName] = useState("");

  if (!user) return <NotFound />;

  const onSubmit = (e) => {
    e.preventDefault();
    let categData = {
      name: categName,
      userId: user.uid,
    };
    addCateg(categData);
    document.getElementById("name").value = "";
    console.log(categData);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Header />
      <h1 className="flex w-[90%] gap-2 text-left font-nohemiLight text-2xl">
        Üdvözlünk, <span className="text-sky-200">{user?.displayName}</span>
      </h1>
      <div className="flex h-full w-[90%] flex-row items-center justify-center gap-4 rounded-lg border-2 border-sky-950 bg-black/20 p-4 shadow-md backdrop-blur-md">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="font-nohemiLight text-2xl">Kategóriák</h1>
          <ul className="flex flex-col text-center">
            {categories?.map(
              (e) =>
                e.userId == user?.uid && (
                  <li
                    key={e.name}
                    className="font-nohemiLight text-xl text-sky-200"
                  >
                    {e.name}
                  </li>
                ),
            )}
          </ul>
          <form onSubmit={onSubmit}>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Kategória neve"
              onChange={(e) => setCategName(e.target.value)}
              className="text-md my-2 rounded-l-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
            />
            <input
              type="submit"
              value="+"
              className="text-md my-2 cursor-pointer rounded-r-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
            />
          </form>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="font-nohemiLight text-2xl">Tranzakciók</h1>
          <p className="font-nohemiLight">Fejlesztés alatt...</p>
        </div>
      </div>
      <Spotlight />
    </div>
  );
};

export default Dashboard;
