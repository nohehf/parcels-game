import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import Nav from "../../components/Nav";
import ParcelMenu from "../../components/ParcelMenu";
import Player from "../../components/Player";
import Res from "../../components/Res";
import TwemojiCoin from "../../components/TwemojiCoin";
import Viewer3dNoSSR from "../../components/Viewer3dNoSSR";
import useClaim from "../../hooks/useClaim";
import useParcel from "../../hooks/useParcel";
import { formatAddress, getClaimableAmount } from "../../hooks/utils";
import useParcelContract from "../../hooks/useParcelContract";
import { useAccount } from "wagmi";
import useParcelComposables from "../../hooks/useParcelComposables";
import styles from "../../styles/clouds.module.css";
import { useParcelEvents } from "../../hooks/useEvents";
import Grid from "../../components/Grid";
import { action } from "../../types/Composable";

const parcel = {
  income: 100,
  balance: 300,
};

const Parcel: NextPage = (params) => {
  const router = useRouter();

  const posX = parseInt(
    typeof router.query.id === "string" ? router.query.id?.split(",")[0] : "0"
  );
  const posY = parseInt(
    typeof router.query.id === "string" ? router.query.id?.split(",")[1] : "0"
  );

  const parcel = useParcel({
    posX: posX,
    posY: posY,
  });

  const [{ data, error, loading }, disconnect] = useAccount();

  const isOwner = () => data?.address === parcel.data?.owner;

  const mutation = useClaim();

  const claim = async () => {
    await mutation.mutateAsync({
      posX: posX,
      posY: posY,
    });
  };

  const parcel_contract = useParcelContract();

  useParcelEvents(posX, posY);
  const [menu, setMenu] = useState(action.REMOVE);

  return (
    <div className={styles.cloud} id="cloud_background w-full">
      <div className="w-1/2 max-h-full flex-col flex">
        <Viewer3dNoSSR file="/parcel3d.glb" />
      </div>
      <div className="bg-white backdrop-blur-md bg-opacity-75 text-gray-700 overflow-hidden rounded-xl my-3 mr-3 w-1/2">
        <div className="h-[25%]">
          <ParcelInfo
            isOwner={isOwner()}
            parcelData={parcel.data}
            claim={claim}
          ></ParcelInfo>
          <MenuSelect menu={menu} setMenu={setMenu} />
        </div>

        <div className="overflow-auto h-[73%]">
          <ParcelMenu menu={menu} isOwner={isOwner()} posX={posX} posY={posY} />
        </div>
      </div>
    </div>
  );
};

interface Props {
  isOwner: boolean;
  parcelData: any;
  claim: () => void;
}
const ParcelInfo: React.FC<Props> = ({ isOwner, parcelData, claim }) => {
  if (isOwner) {
    return (
      <div className="flex justify-between m-2 p-2 px-4 rounded-xl flex-wrap bg-white">
        <div className="flex flex-col justify-start">
          <h2 className="font-unifraktur text-2xl text-left">
            {parcelData?.name}
          </h2>
          <Res amount={parcelData?.productionRate || 0}>/day</Res>
        </div>

        <div className="font-almendra text-lg flex flex-col items-end">
          {/* <div>Last claim: {parcelData?.lastClaimTime.toLocaleString()}</div> */}
          <Res
            amount={getClaimableAmount(
              parcelData?.productionRate,
              parcelData?.lastClaimTime
            )}
          ></Res>
          <button
            className="bg-lime-500 rounded-xl px-2 py-0.5 font-unifraktur text-white mt-1"
            onClick={claim}
            // onClick={() => parcel_contract.claim(1, 1)}
          >
            Claim
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between p-5 flex-wrap ">
        <h2 className="font-unifraktur text-2xl mb-1">{parcelData?.name}</h2>
        Owner: {formatAddress(parcelData?.owner)}
        <Res amount={parcelData?.productionRate || 0}>/day</Res>
      </div>
    );
  }
};

const MenuSelect: React.FC<{
  menu: action;
  setMenu: Dispatch<SetStateAction<action>>;
}> = ({ menu, setMenu }) => {
  const menuStyle = (Action: action) => {
    const base = "bg-white rounded-xl px-5 py-0.5";
    if (menu === Action) {
      if (Action === action.REMOVE) {
        return base + " outline-red-400 outline outline-4";
      } else if (Action === action.BUILD) {
        return base + " outline-purple-400 outline outline-4";
      } else {
        return base + " outline-orange-400 outline outline-4";
      }
    } else {
      return base;
    }
  };

  return (
    <div className="flex justify-around font-unifraktur text-xl">
      <button
        onClick={() => setMenu(action.REMOVE)}
        className={menuStyle(action.REMOVE)}
      >
        Parcel
      </button>
      <button
        onClick={() => setMenu(action.BUILD)}
        className={menuStyle(action.BUILD)}
      >
        Inventory
      </button>
      <button
        onClick={() => setMenu(action.CRAFT)}
        className={menuStyle(action.CRAFT)}
      >
        Craft
      </button>
    </div>
  );
};

export default Parcel;
