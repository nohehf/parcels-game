import React from "react";
import Link from "next/link";
import { transform } from "@babel/core";

interface Props {}

const Clouds: React.FC<Props> = ({}) => {
  return (
    <div>
      <img
        src={parcel.img}
        alt=""
        className={`w-[100px]`}
        style={{ transform: `rotate(${parcel.rotation}deg)` }}
      />
    </div>
  );
};

export default Clouds;
