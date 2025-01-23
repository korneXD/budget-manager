import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Context } from "../context/Context";
import { NotFound } from "./NotFound";
import Header from "../components/Header";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { categories, expenses } = useContext(Context);

  if (!user) return <NotFound />;
  console.log(expenses);

  return (
    <div>
      <Header />
      <h1 className="mt-40">Szia {user.displayName}</h1>
      <h1>Kategóriák</h1>
      <ul>
        {categories?.map((e) => (
          <li key={e.categName}>{e.categName}</li>
        ))}
      </ul>
      <ul>
        {expenses?.map((e) => (
          <li key={e.amount}>
            {e.amount} id: {e.categID}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
