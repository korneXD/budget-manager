const Targets = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="font-nohemiLight text-3xl text-white">Célok</h2>
      <p className="text-center font-nohemiLight text-xl">
        Kezdj el félretenni!
        <br /> Adj hozzá egy kitűzött célt a {"  '"}Cél létrehozása
        {"'  "}
        gombot megnyomva.
      </p>
      <form>
        <input
          type="submit"
          value="Cél létrehozása"
          className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all"
        />
      </form>
      <div className="flex max-w-5xl flex-wrap items-center justify-center gap-6">
        <div className="flex w-fit flex-col items-start justify-center rounded-xl border-2 border-sky-950 bg-black/30 p-2 shadow-md">
          <p className="w-full text-center font-nohemi text-2xl tracking-wide text-sky-200">
            Lakás
          </p>
          <p className="flex w-full items-center justify-between gap-4 font-nohemiLight text-xl">
            <span className="font-nohemi">Célösszeg:</span> 10.000.000 HUF
          </p>
          <p className="flex w-full items-center justify-between gap-4 font-nohemiLight text-xl">
            <span className="font-nohemi tracking-wide">Haladás:</span>
            1.235.660 HUF
          </p>
          <div className="flex h-fit w-full items-center justify-center">
            <button className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-green-950 bg-green-600/90 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all">
              Bevitel
            </button>
            <button className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-sky-950 bg-sky-900 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all">
              Kivétel
            </button>
            <button className="my-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-red-950 bg-red-600/90 px-3 py-1 font-nohemi text-xl uppercase tracking-wide text-white shadow-md transition-all">
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
      </div>
    </div>
  );
};

export default Targets;
