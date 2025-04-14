import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";
import { addTarget, deleteTarget } from "../utility/crudUtility";
import { Context } from "../context/Context";

const Targets = () => {
  const [targetMaker, showTargetMaker] = useState(false);
  const [targetName, setTargetName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetProgress, setTargetProgress] = useState("");

  const [userTargets, setUserTargets] = useState([]);

  const { user } = useContext(UserContext);
  const { targets } = useContext(Context);

  useEffect(() => {
    setUserTargets([]);
    targets?.map((e) => {
      if (e.userId == user?.uid) {
        setUserTargets((prev) => [...prev, e]);
      }
    });
  }, [targets]);

  const createTarget = () => {
    let targetData = {
      name: targetName,
      amount: targetAmount.replace(/\./g, ""),
      progress: targetProgress.replace(/\./g, ""),
      userId: user?.uid,
    };
    try {
      addTarget(targetData);
      setTargetName("");
      setTargetAmount("");
      setTargetProgress("");
      toast.success("Cél létrehozva!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTarget = (id) => {
    try {
      deleteTarget(id);
      toast.success("Cél törölve!");
    } catch (error) {
      console.log(error);
    }
  };

  function formatWithDots(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="font-nohemiLight text-3xl text-white">Célok</h2>
      <p className="max-w-[250px] text-center font-nohemiLight text-lg md:text-xl">
        Kezdj el félretenni!
        <br /> Adj hozzá egy kitűzött célt a {"  '"}Cél létrehozása
        {"'  "}
        gombot megnyomva.
      </p>
      <button
        onClick={() => showTargetMaker(!targetMaker)}
        className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all"
      >
        Cél létrehozása
      </button>
      {targetMaker && (
        <div className="relative flex h-fit w-fit items-center justify-center rounded-xl border-2 border-sky-950 bg-sky-800 p-4 shadow-md">
          <div className="flex flex-col items-end justify-center gap-2">
            <div className="flex items-center justify-center">
              <p className="font-nohemiLight">Cél neve:</p>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="ml-2 w-fit rounded-lg border-2 border-sky-950 bg-black/50 p-1 font-nohemiLight text-sky-200 focus:outline-none"
                placeholder="Pl.: Lakás, Autó, Utazás"
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-nohemiLight">Célösszeg:</p>
              <input
                type="text"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="ml-2 w-fit rounded-lg border-2 border-sky-950 bg-black/50 p-1 font-nohemiLight text-sky-200 focus:outline-none"
                placeholder="Pl.: 125.000 HUF"
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-nohemiLight">Haladás:</p>
              <input
                type="text"
                value={targetProgress}
                onChange={(e) => setTargetProgress(e.target.value)}
                className="ml-2 w-fit rounded-lg border-2 border-sky-950 bg-black/50 p-1 font-nohemiLight text-sky-200 focus:outline-none"
                placeholder="Pl.: 50.000 HUF"
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                onClick={() =>
                  targetName != "" || targetAmount != "" || targetProgress != ""
                    ? createTarget()
                    : toast.error("Hiányzó adatok!")
                }
                className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all"
              >
                Létrehozás
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex max-w-5xl flex-col flex-wrap items-center justify-center gap-6 md:flex-row">
        {userTargets &&
          userTargets.map((e, i) => (
            <div
              key={i}
              className="relative flex w-fit max-w-lg flex-col items-start justify-center rounded-xl border-2 border-sky-950 bg-black/30 p-4 shadow-md"
            >
              <p className="max-w-[400px] truncate text-center font-nohemi text-2xl tracking-wide text-sky-200">
                {e.name}
              </p>
              <p className="flex w-full items-center justify-between gap-4 font-nohemiLight text-xl">
                <span className="font-nohemi">Célösszeg:</span>{" "}
                <span className="max-w-[200px] truncate">
                  {formatWithDots(parseInt(e.amount.replace(/\./g, ""), 10))}
                </span>{" "}
                HUF
              </p>
              <p className="flex w-full items-center justify-between gap-4 font-nohemiLight text-xl">
                <span className="font-nohemi tracking-wide">Haladás:</span>
                <span className="max-w-[200px] truncate">
                  {formatWithDots(parseInt(e.progress.replace(/\./g, ""), 10))}
                </span>{" "}
                HUF
              </p>
              <progress
                value={(e.progress / e.amount) * 100}
                className="w-full overflow-hidden rounded-xl border-2 border-sky-950"
                max={100}
              />
              <div className="flex h-fit w-full items-center justify-center">
                <button className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-green-950 bg-green-600/90 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all">
                  Módosítás
                </button>
                <button
                  onClick={() => handleDeleteTarget(e.id)}
                  className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-red-950 bg-red-600/90 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Targets;
