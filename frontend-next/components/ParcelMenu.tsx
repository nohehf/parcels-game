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

interface Props {}

const ParcelMenu: React.FC<Props> = ({}) => {
  return (
    <div className="p-2 bg-white text-black flex flex-wrap justify-center">
      <RemoveMenu />
      <InventoryMenu />
      <CraftMenu />
    </div>
  );
};

export default ParcelMenu;
