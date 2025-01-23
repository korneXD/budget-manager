import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NotFound } from "./NotFound";

export const Profile = () => {
  const { user } = useContext(UserContext);
  if (!user) return <NotFound />;

  return (
    <div>
      <h1>Profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
    </div>
  );
};
