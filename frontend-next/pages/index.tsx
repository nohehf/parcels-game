import type { NextPage } from "next";
import Image from "next/image";

import { Greeter } from "../components/Greeter";
import GridParcel from "../components/GridParcel";
import { Symfoni } from "../hardhat/SymfoniContext";

const Home: NextPage = () => {
  return (
    <div className="App">
      <GridParcel></GridParcel>
    </div>
  );
};

export default Home;
