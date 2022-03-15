import type { NextPage } from "next";
import styles from "../styles/clouds.module.css";

import Grid from "../components/Grid";
import ParcelMenu from "../components/ParcelMenu";
import { useState } from "react";
import { Parcel } from "../types/Composable";
import Res from "../components/Res";
import { formatAddress } from "../hooks/utils";
import Address from "../components/Address";
import { useAccount } from "wagmi";
import Link from "next/link";
import IcOutlineRemoveRedEye from "../components/IcOutlineRemoveRedEye";
import useParcelGrid from "../hooks/useParcelGrid";

const Home: NextPage = () => {
  const [selected, setSelectd] = useState<null | Parcel>(null);
  return (
    <div className="flex items-center w-full h-full justify-around">
      <div className="flex justify-center p-1 rounded-xl  bg-opacity-50 max-w-1/2">
        <Grid selected={selected} setSelected={setSelectd} />
      </div>
      <div className="w-1/2">
        <SelectedMenu parcel={selected} />
        { selected && JSON.stringify(selected.metadata)}
      </div>
      {/* <OwnedParcels /> */}
    </div>
  );
};

const SelectedMenu: React.FC<{ parcel: Parcel | null }> = ({ parcel }) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  if (parcel === null) {
    return <div>Select a parcel in the grid !</div>;
  }
  return (
    <div className="bg-white backdrop-blur-md bg-opacity-75 text-gray-700 overflow-hidden rounded-xl mt-2 mb-3 mr-3">
      <div className="flex justify-between  bg-white rounded-xl m-2 p-2 px-4">
        <div className="flex-col flex justify-between">
          <h2 className="font-unifraktur text-2xl text-left">{parcel?.name}</h2>
          <Res amount={parcel?.productionRate || 0}>/day</Res>
        </div>

        <div className="flex flex-col items-end justify-between text-black">
          <span className="text-black">
            <Address
              address={parcel.owner}
              me={data?.address === parcel.owner}
            />
          </span>
          <button>
            <Link href={"/parcel/" + parcel.posX + "," + parcel.posY}>
              <div className="font-almendra flex items-center bg-lime-400 px-2 py-0.5 rounded-xl">
                <span className="text-lg mr-1">
                  <IcOutlineRemoveRedEye />
                </span>

                <span className="text-sm">Show parcel</span>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

interface Props {}
const OwnedParcels: React.FC<Props> = ({}) => {
  const parcelGrid = useParcelGrid();
  return (
    <div className="w-5 h-5">
      {parcelGrid.data?.map((parcel) => {
        <div className="w-4 h-4 bg-red-500">aaa</div>;
      })}
    </div>
  );
};

export default Home;
