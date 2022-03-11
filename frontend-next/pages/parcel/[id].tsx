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
import { formatAddress, getClaimableAmount } from "../../hooks/utils";
import useParcelContract from "../../hooks/useParcelContract";
import { useAccount } from "wagmi";
import useParcelComposables from "../../hooks/useParcelComposables";

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

  const [{ data, error, loading }, disconnect] = useAccount();

  const isOwner = () => data?.address === parcel.data?.owner;

  const mutation = useClaim();

  const claim = async () => {
    await mutation.mutateAsync({
      posX: 1,
      posY: 1,
    });
  };

  const parcel_contract = useParcelContract();

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
        <div className="">
          <hr />
        </div>
        <ParcelInfo
          isOwner={isOwner()}
          parcelData={parcel.data}
          claim={claim}
        ></ParcelInfo>
        <hr />
        <ParcelMenu isOwner={isOwner()} />
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
      <div className="flex justify-between p-5 flex-wrap ">
        <h2 className="font-unifraktur text-2xl mb-1">{parcelData?.name}</h2>
        <Res amount={parcelData?.productionRate || 0}>/day</Res>
        <div className="font-almendra text-lg flex flex-col items-center">
          <div>Last claim: {parcelData?.lastClaimTime.toLocaleString()}</div>
          <Res
            amount={getClaimableAmount(
              parcelData?.productionRate,
              parcelData?.lastClaimTime
            )}
          ></Res>
          <button
            className="bg-lime-500 rounded-xl px-2 py-0.5 font-unifraktur text-white"
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

export default Parcel;
