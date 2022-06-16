import type { NextPage } from "next";
import MobileNavigation from "../components/MobileNavigation/MobileNavigation";

const Home: NextPage = () => {
  return (
    <div>
      <MobileNavigation
        activeItemId="nav_meetings"
        onSelect={(id) => console.log(`Nav item ${id} was clicked`)}
      />
    </div>
  );
};

export default Home;
