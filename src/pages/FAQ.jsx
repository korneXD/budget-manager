import { useEffect, useState } from "react";
import { Spotlight } from "../components/Spotlight";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqData = [
  {
    category: "Fiók",
    questions: [
      {
        id: "account-1",
        question: "Hogyan hozhatok létre fiókot?",
        answer:
          "Fiók létrehozásához kattints a kezdőlap jobb felső sarkában található 'Regisztráció' gombra. Töltsd ki az adataidat, beleértve a nevedet, e-mail címedet és jelszavadat. Ezután kattints a 'Fiók létrehozása' gombra a folyamat befejezéséhez.",
      },
      {
        id: "account-2",
        question: "Hogyan tudom visszaállítani a jelszavamat?",
        answer:
          "A jelszó visszaállításához kattints a 'Bejelentkezés' gombra, majd válaszd a 'Elfelejtett jelszó' opciót. Add meg a fiókoddal társított e-mail címet, és küldünk egy útmutatót a jelszó visszaállításához.",
      },
      {
        id: "account-3",
        question: "Lehet több fiókom is?",
        answer:
          "Igen, létrehozhatsz több fiókot különböző e-mail címekkel. Fontos azonban megjegyezni, hogy minden fiók külön lesz kezelve, és saját beállításokkal, előzményekkel és preferenciákkal fog rendelkezni.",
      },
    ],
  },
  {
    category: "Számlázás",
    questions: [
      {
        id: "billing-1",
        question: "Milyen fizetési módokat fogadnak el?",
        answer:
          "Elfogadjuk az összes nagyobb hitelkártyát (Visa, MasterCard, American Express), a PayPalt, valamint éves előfizetés esetén a banki átutalást is.",
      },
      {
        id: "billing-2",
        question: "Hogyan frissíthetem a számlázási adataimat?",
        answer:
          "Számlázási adataidat a 'Fiókbeállítások' > 'Számlázás' menüpontban frissítheted, az 'Fizetési mód szerkesztése' gombra kattintva. Itt módosíthatod a bankkártya adataidat vagy válthatsz másik fizetési módra.",
      },
      {
        id: "billing-3",
        question: "Kaphatok visszatérítést?",
        answer:
          "Igen, minden új előfizetésre 30 napos pénzvisszafizetési garanciát kínálunk. Ha nem vagy elégedett a szolgáltatásunkkal, a vásárlástól számított 30 napon belül kérheted a visszatérítést. Ehhez vedd fel a kapcsolatot az ügyfélszolgálatunkkal.",
      },
    ],
  },
  {
    category: "Szolgáltatások",
    questions: [
      {
        id: "services-1",
        question: "Milyen szolgáltatásokat kínálnak?",
        answer:
          "Szolgáltatásaink közé tartozik a webdesign, fejlesztés, tárhelyszolgáltatás, karbantartás, SEO optimalizálás és digitális marketing. Minden szolgáltatásunk testre szabható az egyéni igényeidnek megfelelően.",
      },
      {
        id: "services-2",
        question: "Kínálnak egyedi megoldásokat is?",
        answer:
          "Igen, szakterületünk az egyedi megoldások fejlesztése, amelyek az üzleti igényeidre vannak szabva. Csapatunk szorosan együttműködik veled, hogy megértse az elvárásaidat, és egy olyan megoldást hozzon létre, amely eléri a céljaidat.",
      },
      {
        id: "services-3",
        question: "Mennyi idő alatt készül el egy projekt?",
        answer:
          "A projektek időtartama a munka terjedelmétől és összetettségétől függ. Egy egyszerű weboldal elkészítése általában 2–4 hetet vesz igénybe, míg egy bonyolultabb projekt akár több hónapot is. Az első konzultáció során részletes időtervet biztosítunk.",
      },
    ],
  },
  {
    category: "Támogatás",
    questions: [
      {
        id: "support-1",
        question: "Hogyan vehetem fel a kapcsolatot az ügyfélszolgálattal?",
        answer:
          "Ügyfélszolgálatunkat elérheted e-mailben a support@example.com címen, weboldalunk élő chatjén keresztül, vagy telefonon a (123) 456-7890 számon. Ügyfélszolgálatunk hétfőtől péntekig 9:00 és 18:00 (EST) között áll rendelkezésre.",
      },
      {
        id: "support-2",
        question: "Van 0–24-es ügyfélszolgálat?",
        answer:
          "Igen, kritikus problémák esetén 0–24-es sürgősségi támogatást nyújtunk. Nem sürgős esetekben a normál nyitvatartási idő érvényes. Vállalati ügyfelek számára elérhetők prémium támogatási csomagok meghosszabbított időszakkal.",
      },
      {
        id: "support-3",
        question: "Van tudásbázis vagy dokumentáció?",
        answer:
          "Igen, rendelkezünk átfogó tudásbázissal, amely oktatóanyagokat, útmutatókat és dokumentációkat tartalmaz. Ezt a 'Súgó' menüpontban találod a fiókod irányítópultján, vagy ellátogathatsz a docs.example.com weboldalra.",
      },
    ],
  },
];

const SearchIcon = () => (
  <svg
    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-sky-500"
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

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  useEffect(() => {
    document.title = "Money Map | Gyakori Kérdések";
  }, []);

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id],
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-32 max-w-4xl px-4 md:mt-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-nohemi text-3xl font-bold tracking-tight text-sky-400">
            Gyakori Kérdések
          </h1>
          <p className="mx-auto max-w-2xl font-nohemiLight text-white">
            Találd meg a válaszokat a leggyakrabban feltett kérdésekre, és
            ismerd meg jobban szolgáltatásainkat. Ha további kérdéseid lennének,
            ne habozz kapcsolatba lépni velünk.
          </p>
        </div>

        <div className="relative mx-auto mb-10 max-w-md">
          <div className="relative rounded-md bg-black/30 backdrop-blur-sm">
            <SearchIcon />
            <input
              type="text"
              placeholder="Keresés kérdések között..."
              className="w-full rounded-md border-2 border-sky-950 bg-transparent py-2 pl-10 pr-4 font-nohemiLight text-sky-400 focus:border-sky-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <p className="mt-2 font-nohemiLight text-sm text-sky-400">
              {filteredFAQs.reduce(
                (count, category) => count + category.questions.length,
                0,
              )}{" "}
              találat
            </p>
          )}
        </div>

        <div className="space-y-8">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category) => (
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
                    {category.questions.map((item) => (
                      <div
                        key={item.id}
                        className="border-t-2 border-sky-950 pt-3 font-nohemiLight"
                      >
                        <button
                          className="flex w-full items-center justify-between py-2 text-left focus:outline-none"
                          onClick={() => toggleQuestion(item.id)}
                          aria-expanded={expandedQuestions.includes(item.id)}
                        >
                          <span className="font-medium">{item.question}</span>
                          <ChevronIcon
                            isOpen={expandedQuestions.includes(item.id)}
                          />
                        </button>
                        {expandedQuestions.includes(item.id) && (
                          <div className="mt-2 pb-2 pl-2 pr-6 text-white">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-xl border-2 border-sky-950 bg-black/70 py-10 text-center font-nohemiLight backdrop-blur-sm">
              <p className="text-white">Kérdés nem található.</p>
            </div>
          )}
        </div>

        <Footer />
      </div>
      <Spotlight />
    </div>
  );
};
