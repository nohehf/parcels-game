import type { NextPage } from "next";

import Grid from "../components/Grid";

const Home: NextPage = () => {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: `url("./cloud_bg.svg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-fit p-5 rounded-xl bg-beige">
        <Grid />
      </div>
    </div>
  );
};

export default Home;
