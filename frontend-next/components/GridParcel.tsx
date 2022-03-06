import React from "react";
import Link from "next/link";

interface Props {
  parcel: Parcel;
}

interface Parcel {
  rotation: number;
  img: string;
  id: string;
}

const GridParcel: React.FC<Props> = ({ parcel }) => {
  return (
    <div>
      <Link href={`/parcel/${parcel.id}`}>
        <img
          src={parcel.img}
          alt=""
          className={`rotate-${parcel.rotation} w-[100px]`}
        />
      </Link>
    </div>
  );
};

export default GridParcel;
