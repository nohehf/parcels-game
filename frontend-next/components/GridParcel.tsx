import React from "react";
import Link from "next/link";
import { Parcel } from "../types/Composable";
import { useAccount } from "wagmi";

interface Props {
  parcel: Parcel;
}
const randomRotation = () => {
  return Math.floor(Math.random() * 4) * 90;
};

const borderColor = (parcel: Parcel, address: string | undefined) => {
  if (parcel.owner === address) {
    return "border-lime-500";
  } else {
    return "border-gray-500";
  }
};

const GridParcel: React.FC<Props> = ({ parcel }) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  return (
    <div className={"border-2 " + borderColor(parcel, data?.address)}>
      <Link href={`/parcel/${"" + parcel.posX + "," + parcel.posY}`}>
        <img
          src={"./parcel_top.png"}
          alt=""
          className={`w-[100px]`}
          style={{ transform: `rotate(${randomRotation()}deg)` }}
        />
      </Link>
    </div>
  );
};

export default GridParcel;
