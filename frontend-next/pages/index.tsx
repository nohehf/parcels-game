import type { NextPage } from "next";
import styles from "../styles/clouds.module.css";

import Grid from "../components/Grid";
import ParcelMenu from "../components/ParcelMenu";
import { useState } from "react";
import { Parcel } from "../types/Composable";
import Res from "../components/Res";

const Home: NextPage = () => {
  const [selected, setSelectd] = useState<null | Parcel>(null);
  return (
    <div className="flex items-center w-full h-full justify-around">
      <div className="flex justify-center p-1 rounded-xl  bg-opacity-50 max-w-1/2">
        <Grid selected={selected} setSelected={setSelectd} />
      </div>
      <div className="w-1/2">
        <SelectedMenu parcel={selected} />
      </div>
    </div>
  );
};

const SelectedMenu: React.FC<{ parcel: Parcel | null }> = ({ parcel }) => {
  if (parcel === null) {
    return <div>Select a parcel in the grid !</div>;
  }
  return (
    <div className="bg-white backdrop-blur-md bg-opacity-75 text-gray-700 overflow-hidden rounded-xl mt-2 mb-3 mr-3">
      <div className="flex flex-col justify-start bg-white rounded-xl m-2 p-2 px-4">
        <div>
          <h2 className="font-unifraktur text-2xl text-left">{parcel?.name}</h2>
          <Res amount={parcel?.productionRate || 0}>/day</Res>
        </div>

        <div>
          <div>owned by: {parcel.owner}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
