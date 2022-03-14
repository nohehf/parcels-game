import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Parcel } from "../types/Composable";
import { useAccount } from "wagmi";
import { url } from "inspector";

interface Props {
  parcel: Parcel;
  selected: null | Parcel;
  setSelected: Dispatch<SetStateAction<Parcel | null>>;
}
const randomRotation = () => {
  //return Math.floor(Math.random() * 4) * 90;
  return 0;
};

const style = (
  parcel: Parcel,
  address: string | undefined,
  isSelected: boolean
) => {
  if (isSelected) {
    return "border-2 border-yellow-500 drop-shadow-lg";
  }
  if (parcel.owner === address) {
    return "border-2 border-lime-500";
  } else {
    return " border-0 border-gray-500";
  }
};

const GridParcel: React.FC<Props> = ({ parcel, selected, setSelected }) => {
  const isSelected = (): boolean => {
    return parcel.posX === selected?.posX && parcel.posY === selected.posY;
  };
  const [{ data, error, loading }, disconnect] = useAccount();
  return (
    <button
      onClick={() => setSelected(parcel)}
      style={{ zIndex: isSelected() ? 5 : 1 }}
    >
      <div
        className={
          "w-[100px] h-[100px] " + style(parcel, data?.address, isSelected())
        }
        style={{
          transform: `rotate(${randomRotation()}deg) ${
            isSelected() ? "scale(1.2)" : ""
          }`,
          // backgroundImage: `url("test.png")`,

          backgroundImage: `url("${parcel?.metadata.image_data}")`,
          backgroundSize: "cover",
        }}
      ></div>

      {/* <img
          src={"./parcel_top.png"}
          alt=""
          className={`w-[100px]`}
          
        /> */}
    </button>
  );
};

export default GridParcel;
