import React, { useState } from "react";
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
}

const ParcelMenu: React.FC<Props> = ({ isOwner }) => {
  return (
    <div className="p-2 bg-white text-black flex flex-wrap justify-center">
      <RemoveMenu isOwner={isOwner} />
      <InventoryMenu isOwner={isOwner} />
      <CraftMenu isOwner={isOwner} />
    </div>
  );
};

export default ParcelMenu;
