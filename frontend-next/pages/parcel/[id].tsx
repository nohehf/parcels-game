import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import ParcelMenu from "../../components/ParcelMenu";
import Player from "../../components/Player";
import Res from "../../components/Res";
import TwemojiCoin from "../../components/TwemojiCoin";
import Viewer3dNoSSR from "../../components/Viewer3dNoSSR";

const parcel = {
  income: 100,
  balance: 300,
};

const Parcel: NextPage = (params) => {
  const router = useRouter();
  return (
    <div
      className="flex w-full justify-between text-center flex-shrink"
      style={{
        backgroundImage: `url("/cloud_bg.svg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="grow">
        <div className="h-full">
          <Viewer3dNoSSR file="/parcel3d.glb" />
        </div>
      </div>
      <div className="max-w-[700px] bg-white text-black overflow-x-auto">
        <div className="">
          <Player />
          <hr />
        </div>
        <div className="flex justify-between p-5">
          <h2 className="font-unifraktur text-2xl mb-1">
            parcel n°
            {" " + router.query.id}
          </h2>
          <Res amount={100}>/day</Res>
          <div className="font-almendra text-lg flex flex-col items-center">
            <div></div>
            <Res amount={300}></Res>
            <button className="bg-lime-500 rounded-xl px-2 py-0.5 font-unifraktur text-white">
              Claim
            </button>
          </div>
        </div>
        <hr />
        <ParcelMenu />
      </div>
    </div>
  );
};

export default Parcel;
