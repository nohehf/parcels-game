import React from "react";
import Link from "next/link";
import { transform } from "@babel/core";

interface Props {
  parcel: Parcel;
}

interface Parcel {
  rotation: number;
  img: string;
  id: string;
}

const Cloud: React.FC<Props> = ({ parcel }) => {
  return (
    <div>
      <Link href={`/parcel/${parcel.id}`}>
        <img
          src={parcel.img}
          alt=""
          className={`w-[100px]`}
          style={{ transform: `rotate(${parcel.rotation}deg)` }}
        />
      </Link>
    </div>
  );
};

export default Cloud;
