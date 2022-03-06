import type { NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Greeter } from "../components/Greeter";
import GridParcel from "../components/GridParcel";
import { Symfoni } from "../hardhat/SymfoniContext";
import Grid from "../components/Grid";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center font-unifraktur">
      <h1 className="text-5xl m-10">Parcel</h1>
      <div className="w-fit p-5 rounded-xl bg-beige">
        <Grid />
      </div>
    </div>
  );
};

export default Home;
