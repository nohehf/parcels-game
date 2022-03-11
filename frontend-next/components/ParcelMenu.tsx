import React, { useState } from "react";
import { useAccount } from "wagmi";
import {
  IComposable,
  action,
  castle,
  display,
  farm,
} from "../types/Composable";
import ArrowButton from "./ArrowButton";
import ComposableItem from "./ComposableItem";
import CraftMenu from "./CraftMenu";
import InventoryMenu from "./InventoryMenu";
import RemoveMenu from "./RemoveMenu";

interface Props {
  isOwner: boolean;
  posX: number;
  posY: number;
}

const ParcelMenu: React.FC<Props> = ({ isOwner, posX, posY }) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  if (data?.address) {
    return (
      <div className="p-2 bg-white text-black flex flex-wrap justify-center">
        <RemoveMenu isOwner={isOwner} posX={posX} posY={posY} />
        <hr className="w-full" />
        <InventoryMenu isOwner={isOwner} posX={posX} posY={posY} />
        <hr className="w-full" />
        <CraftMenu isOwner={isOwner} />
      </div>
    );
  } else {
    return (
      <div className="p-2 bg-white text-black flex flex-wrap justify-center w-full">
        <RemoveMenu isOwner={isOwner} posX={posX} posY={posY} />
      </div>
    );
  }
};

export default ParcelMenu;
