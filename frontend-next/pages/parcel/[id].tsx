import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import BuildMenu from "../../components/ComposableMenu";
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
      className="flex w-full justify-between text-center"
      style={{
        backgroundImage: `url("/cloud_bg.svg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-3/5">
        <h1>
          parcel n°
          {" " + router.query.id}
        </h1>
        <div className="h-3/4 mx-2">
          <Viewer3dNoSSR file="/parcel3d.glb" />
        </div>
        <div className="flex justify-between p-5">
          <Res amount={100}>/day</Res>
          <div className="font-almendra text-lg flex flex-col items-center">
            <div></div>
            <Res amount={300}></Res>
            <button className="bg-lime-500 rounded-xl px-2 py-0.5 font-unifraktur">
              Claim
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <BuildMenu name="Inventory" callback={() => {}} />
      </div>
    </div>
  );
};

export default Parcel;
