import type { NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Greeter } from "../components/Greeter";
import GridParcel from "../components/GridParcel";
import { Symfoni } from "../hardhat/SymfoniContext";
import Grid from "../components/Grid";
import { url } from "inspector";

const Home: NextPage = () => {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: `url("./cloud_bg.svg")`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-7xl m-10 font-unifraktur drop-shadow-lg">
        Parcel <span className="font-sans text-3xl align-top">™️</span>
      </h1>
      <div className="w-fit p-5 rounded-xl bg-beige">
        <Grid />
      </div>
    </div>
  );
};

export default Home;
