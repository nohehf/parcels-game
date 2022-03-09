import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Nav from "../../components/Nav";
import ParcelMenu from "../../components/ParcelMenu";
import Player from "../../components/Player";
import Res from "../../components/Res";
import TwemojiCoin from "../../components/TwemojiCoin";
import Viewer3dNoSSR from "../../components/Viewer3dNoSSR";
import useClaim from "../../hooks/useClaim";
import useParcel from "../../hooks/useParcel";
import { getClaimableAmount } from "../../hooks/utils";

const parcel = {
  income: 100,
  balance: 300,
};

const Parcel: NextPage = (params) => {
  const router = useRouter();
  const parcel = useParcel({
    posX: 1,
    posY: 1,
  });

  const mutation = useClaim();

  const claim = () => {};

  return (
    <div
      className="flex w-full justify-between text-center flex-shrink h-full"
      style={{
        backgroundImage: `url("/cloud_bg.svg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full">
        <Viewer3dNoSSR file="/parcel3d.glb" />
      </div>
      <div className="max-w-[700px] bg-white text-black overflow-x-auto min-w-[350px]">
        <hr />
        <div className="">
          <Player />
          <hr />
        </div>
        <div className="flex justify-between p-5 flex-wrap ">
          <h2 className="font-unifraktur text-2xl mb-1">{parcel.data?.name}</h2>
          <Res amount={parcel.data?.productionRate || 0}>/day</Res>
          <div className="font-almendra text-lg flex flex-col items-center">
            <div>Last claim: {parcel.data?.lastClaimTime.toLocaleString()}</div>
            <Res
              amount={getClaimableAmount(
                parcel.data?.productionRate,
                parcel.data?.lastClaimTime
              )}
            ></Res>
            <button
              className="bg-lime-500 rounded-xl px-2 py-0.5 font-unifraktur text-white"
              onClick={() => {
                mutation.mutateAsync({
                  posX: 1,
                  posY: 1,
                });
              }}
            >
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
