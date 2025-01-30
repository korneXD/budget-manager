import React from "react";
import { addCateg } from "../utility/crudUtility";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";

const Categories = ({ values }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [categName, setCategName] = useState("");

  const onSubmitCateg = (e) => {
    e.preventDefault();
    setCategName("");
    let categData = {
      name: categName,
      userId: user.uid,
    };
    if (categName) addCateg(categData);
    document.getElementById("categName").value = "";
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="font-nohemiLight text-3xl">Kategóriák</h1>
      {values && (
        <div
          className="relative z-10 flex h-fit w-fit min-w-[30%] max-w-[35%] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-sky-950 bg-black/20 px-6 text-center shadow-md backdrop-blur-md"
          onClick={() => setOpen(!open)}
        >
          <h1 className="w-full font-nohemiLight text-2xl">
            {data?.name ? data.name : "Nincs"}
          </h1>
          {open && (
            <div className="absolute top-full z-20 flex h-fit w-full flex-col items-center justify-center divide-y divide-stone-400 rounded-lg border-2 border-sky-950 bg-stone-900 px-2 shadow-md">
              {values?.map(
                (e) =>
                  e.userId == user?.uid && (
                    <span
                      key={e?.name}
                      className="w-full text-center font-nohemiLight text-2xl text-sky-200"
                      onClick={() => setData(e)}
                    >
                      {e.name}
                    </span>
                  ),
              )}
            </div>
          )}
        </div>
      )}
      <form onSubmit={onSubmitCateg}>
        <input
          type="name"
          name="name"
          id="categName"
          placeholder="Kategória neve"
          onChange={(e) => setCategName(e.target.value)}
          className="text-md my-2 rounded-l-xl border-2 border-sky-950 bg-black/30 px-3 py-1 font-nohemiLight text-xl tracking-wide text-white shadow-md outline-none backdrop-blur-sm"
        />
        <input
          type="submit"
          value="+"
          onClick={() => {
            if (!categName) toast.info("Adj meg egy kategóriát!");
          }}
          className="my-2 cursor-pointer rounded-r-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-sky-400 shadow-md transition-all hover:text-sky-200"
        />
      </form>
    </div>
  );
};

export default Categories;
