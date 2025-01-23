import Header from "../components/Header";
import { Spotlight } from "../components/Spotlight";

export const Homepage = () => {
  return (
    <div className="flex">
      <Header />
      <h1>Homepage</h1>
      <Spotlight />
    </div>
  );
};
