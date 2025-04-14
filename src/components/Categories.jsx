import React from "react";
import {
  addCateg,
  deleteCategory,
  deleteTransactionByCategory,
} from "../utility/crudUtility";
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

  const handleDeleteCategory = (id) => {
    try {
      deleteTransactionByCategory(id);
      deleteCategory(id);
      setData({});
      toast.success("Kategória törölve!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="font-nohemiLight text-3xl">Kategóriák</h1>
      <div className="flex h-fit w-full items-center justify-center gap-2">
        {values && (
          <div
            className="relative z-10 flex h-fit w-fit min-w-[30%] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-sky-950 bg-black/20 px-6 text-center shadow-md backdrop-blur-md md:max-w-[35%]"
            onClick={() => setOpen(!open)}
          >
            <h1 className="w-full max-w-[200px] truncate font-nohemiLight text-2xl">
              {data?.name ? data.name : "Nincs"}
            </h1>
            {open && (
              <div className="absolute top-full z-20 flex h-fit w-full flex-col items-center justify-center divide-y divide-stone-400 truncate rounded-lg border-2 border-sky-950 bg-stone-900 px-2 shadow-md">
                {values?.map(
                  (e) =>
                    e.userId == user?.uid && (
                      <span
                        key={e?.name}
                        className="w-full truncate text-center font-nohemiLight text-2xl text-sky-200"
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
        <button
          onClick={() =>
            data?.name == null
              ? toast.error("Válassz ki egy kategóriát!")
              : handleDeleteCategory(data?.id)
          }
          className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-red-950 bg-red-600/90 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
      <form
        onSubmit={onSubmitCateg}
        className="flex flex-row items-center justify-center"
      >
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
