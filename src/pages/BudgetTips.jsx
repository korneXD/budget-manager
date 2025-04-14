import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";
import Footer from "../components/Footer";

const budgetTipsData = [
  {
    category: "Költségvetés Alapjai",
    tips: [
      {
        id: "basics-1",
        title: "Az 50/30/20 Szabály",
        description:
          "A bevételed 50%-át szánd szükségletekre, 30%-át vágyakra, és 20%-át megtakarításra és adósságtörlesztésre. Ez az egyszerű keretrendszer segít kiegyensúlyozott költségvetést kialakítani, amely minden pénzügyi szükségletet lefed.",
      },
      {
        id: "basics-2",
        title: "Kövesd Nyomon a Kiadásaidat",
        description:
          "Legalább 30 napon keresztül jegyezd fel az összes kiadásodat, hogy átlásd, mire megy el a pénzed. Ez a tudatosság minden sikeres költségvetés alapja, és gyakran meglepő kiadási mintákat tár fel.",
      },
      {
        id: "basics-3",
        title: "Használj Költségvetési Eszközöket",
        description:
          "Használj költségvetés-tervező alkalmazásokat és táblázatokat a nyomon követés és kategorizálás automatizálására. Számos ingyenes eszköz szinkronizálható a fiókjaiddal, és vizuális jelentéseket nyújt a pénzügyeidről.",
      },
    ],
  },
  {
    category: "Megtakarítási Stratégiák",
    tips: [
      {
        id: "saving-1",
        title: "Vészhelyzeti Alap Kialakítása",
        description:
          "Takaríts meg 3–6 hónapnyi alapvető kiadást egy könnyen hozzáférhető számlán. Ez az alap pénzügyi biztonságot nyújt, és megakadályozza, hogy adósságba ess váratlan kiadások esetén.",
      },
      {
        id: "saving-2",
        title: "Automatizáld a Megtakarítást",
        description:
          "Állíts be automatikus átutalást a megtakarítási számládra fizetésnapon. Amit nem látsz, arra nem költesz, és a megtakarításaid következetesen nőnek erőfeszítés nélkül.",
      },
      {
        id: "saving-3",
        title: "A 24 Órás Szabály",
        description:
          "Várj 24 órát minden $50-nál nagyobb, nem létfontosságú vásárlás előtt. Ez a gondolkodási idő segít elkerülni az impulzusvásárlást, és biztosítja, hogy csak valóban fontos dolgokra költs.",
      },
    ],
  },
  {
    category: "Adósságkezelés",
    tips: [
      {
        id: "debt-1",
        title: "Adósság Lavina Módszer",
        description:
          "Fizesd vissza először a legmagasabb kamatozású adósságokat, miközben a többit csak minimálisan törleszted. Ez a megközelítés hosszú távon a legtöbb kamatot takarítja meg.",
      },
      {
        id: "debt-2",
        title: "Adósság Hógolyó Módszer",
        description:
          "Fizesd ki a legkisebb adósságaidat először, hogy lendületet és motivációt szerezz. Minden kifizetett tartozás pszichológiai győzelmet jelent, ami segít elkötelezett maradni az adósságmentesség felé vezető úton.",
      },
      {
        id: "debt-3",
        title: "Fontold Meg a Konszolidációt",
        description:
          "Vizsgáld meg az adósságkonszolidációs lehetőségeket, ha több, magas kamatozású tartozásod van. Az adósságok egy alacsonyabb kamatozású kölcsönbe való összevonása megkönnyítheti a törlesztést.",
      },
    ],
  },
  {
    category: "Kevesebb Kiadás",
    tips: [
      {
        id: "spending-1",
        title: "Előfizetések Áttekintése",
        description:
          "Havonta vizsgáld felül az összes előfizetésedet és tagságodat. Szűntesd meg azokat, amiket nem használsz rendszeresen, vagy nem érnek annyit, amennyibe kerülnek.",
      },
      {
        id: "spending-2",
        title: "Étkezés Tervezése",
        description:
          "Tervezd meg az heti étkezéseket és vásárolj lista alapján. Ez csökkenti az ételpazarlást és megelőzi a drága impulzusvásárlásokat vagy a gyakori ételrendelést.",
      },
      {
        id: "spending-3",
        title: "Használj Visszatérítéseket és Jutalmakat",
        description:
          "Használd ki a visszatérítési alkalmazásokat, bankkártya-jutalmakat és hűségprogramokat azokra a vásárlásokra, amelyeket amúgy is elvégeznél. Ezek az apró összegek idővel sokat számíthatnak.",
      },
    ],
  },
];

const SearchIcon = () => (
  <svg
    className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-sky-950"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg
    className="h-5 w-5 text-sky-500"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={isOpen ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
  </svg>
);

export const BudgetTips = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedTips, setExpandedTips] = useState([]);

  useEffect(() => {
    document.title = "Money Map | Tippek";
  }, []);

  const filteredTips = budgetTipsData
    .map((category) => ({
      ...category,
      tips: category.tips.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.tips.length > 0);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleTip = (id) => {
    setExpandedTips((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  return (
    <div>
      <Navbar />
      <div className="mt-16 flex min-h-screen flex-col items-center justify-center md:mt-12">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-nohemi text-3xl font-bold tracking-tight text-sky-400">
              Tippek
            </h1>
            <p className="mx-auto max-w-2xl font-nohemiLight text-white">
              A következő tippek segíthetnek több pénzt megtakarítani és jobban
              kezelni a költségvetését. Használja ezeket az ötleteket, hogy
              pénzügyi céljait elérje, és a lehető legjobban kihasználja a
              pénzét.
            </p>
          </div>

          <div className="relative mx-auto mb-10 max-w-md">
            <div className="relative rounded-md bg-black/30 backdrop-blur-sm">
              <SearchIcon />
              <input
                type="text"
                placeholder="Keress a tippek között..."
                className="w-full rounded-md border-2 border-sky-950 bg-transparent py-2 pl-10 pr-4 font-nohemiLight text-sky-400 focus:border-sky-400 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <p className="mt-2 font-nohemiLight text-sm text-sky-400">
                {filteredTips.reduce(
                  (count, category) => count + category.tips.length,
                  0,
                )}{" "}
                találat
              </p>
            )}
          </div>

          <div className="space-y-8">
            {filteredTips.length > 0 ? (
              filteredTips.map((category) => (
                <div
                  key={category.category}
                  className="rounded-lg border-2 border-sky-950 bg-black/30 p-6 backdrop-blur-sm"
                >
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => toggleCategory(category.category)}
                  >
                    <h2 className="font-nohemi text-xl font-semibold tracking-wide text-white">
                      {category.category}
                    </h2>
                    <button className="rounded-md px-3 py-1 font-nohemiLight text-gray-400 hover:bg-sky-700 hover:text-sky-500">
                      {expandedCategories.includes(category.category)
                        ? "Rejtsd"
                        : "Mutasd"}
                    </button>
                  </div>

                  {(expandedCategories.includes(category.category) ||
                    searchQuery) && (
                    <div className="mt-4 space-y-3">
                      {category.tips.map((item) => (
                        <div
                          key={item.id}
                          className="border-t-2 border-sky-950 pt-3 font-nohemiLight"
                        >
                          <button
                            className="flex w-full items-center justify-between py-2 text-left focus:outline-none"
                            onClick={() => toggleTip(item.id)}
                            aria-expanded={expandedTips.includes(item.id)}
                          >
                            <span className="font-medium text-white">
                              {item.title}
                            </span>
                            <ChevronIcon
                              isOpen={expandedTips.includes(item.id)}
                            />
                          </button>
                          {expandedTips.includes(item.id) && (
                            <div className="mt-2 pb-2 pl-2 pr-6 text-sky-300">
                              <p>{item.description}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-lg border-2 border-sky-950 bg-black/70 py-10 text-center font-nohemiLight backdrop-blur-sm">
                <p className="text-white">Nem található információ.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <Spotlight />
    </div>
  );
};

export default BudgetTips;
