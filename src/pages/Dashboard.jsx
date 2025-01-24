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
      <div className="flex h-full w-[90%] flex-row items-center justify-center gap-4 rounded-lg border-2 border-sky-950 bg-black/20 p-4 shadow-md backdrop-blur-md">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="font-nohemiLight text-2xl">Kategóriák</h1>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="font-nohemiLight text-2xl">Tranzakciók</h1>
          <p className="font-nohemiLight">Fejlesztés alatt...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
