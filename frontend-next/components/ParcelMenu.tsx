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
  menu: action;
  isOwner: boolean;
  posX: number;
  posY: number;
}

const ParcelMenu: React.FC<Props> = ({ menu, isOwner, posX, posY }) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  if (data?.address) {
    return (
      <div className="p-2 flex flex-wrap justify-center">
        {menu === action.REMOVE && (
          <RemoveMenu isOwner={isOwner} posX={posX} posY={posY} />
        )}
        {menu === action.BUILD && (
          <InventoryMenu isOwner={isOwner} posX={posX} posY={posY} />
        )}
        {menu === action.CRAFT && <CraftMenu isOwner={isOwner} />}
      </div>
    );
  } else {
    return (
      <div className="p-2 text-black flex flex-wrap justify-center w-full">
        <RemoveMenu isOwner={isOwner} posX={posX} posY={posY} />
      </div>
    );
  }
};

export default ParcelMenu;
