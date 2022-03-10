import React from "react";
import useInventory from "../hooks/useInventory";
import {
  IComposable,
  action,
  castle,
  display,
  farm,
} from "../types/Composable";
import ArrowButton from "./ArrowButton";
import ComposableItem from "./ComposableItem";

interface Props {
  isOwner: boolean;
}

const dummyInventory: IComposable[] = [castle, farm];

const InventoryMenu: React.FC<Props> = ({ isOwner }) => {
  const inventory = useInventory();
  return (
    <div className="rounded-xl bg-white text-black w-full">
      <h2 className="font-unifraktur text-2xl mb-1">your inventory</h2>
      {JSON.stringify(inventory.data)}
      <div className="flex flex-wrap justify-between">
        {dummyInventory.map((item, index) => {
          return (
            <ComposableItem
              key={index}
              composable={item}
              Action={isOwner ? action.BUILD : action.NONE}
              display={display.MIN}
            ></ComposableItem>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryMenu;
