import type { NextPage } from "next";

import Grid from "../components/Grid";
import useEvents from "../hooks/useEvents";

const Home: NextPage = () => {
  return (
    <div
      className="flex flex-col items-center h-full justify-center"
      style={{
        backgroundImage: `url("./cloud_bg.svg")`,
        backgroundSize: "cover",
      }}
    >
      <div className=" p-5 rounded-xl bg-white bg-opacity-50 backdrop-blur-md">
        <Grid />
      </div>
    </div>
  );
};

export default Home;
