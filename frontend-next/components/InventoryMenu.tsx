import React from "react";
import useInventory from "../hooks/useInventory";
import usePlaceComposable from "../hooks/usePlaceComposable";
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
  const placeComposableMutation = usePlaceComposable();
  const buttonCallback = (tokenId: number) => {
    placeComposableMutation.mutateAsync({ posX: 1, posY: 1, tokenId: tokenId });
  };
  return (
    <div className=" bg-white text-black w-full">
      <h2 className="font-unifraktur text-2xl mb-1">your inventory</h2>
      <div className="flex flex-wrap justify-between">
        {inventory.data?.map((item, index) => {
          return (
            <ComposableItem
              key={index}
              composable={item.composable}
              number={item.amount}
              Action={isOwner ? action.BUILD : action.NONE}
              display={display.MIN}
              callback={() => buttonCallback(1)}
            ></ComposableItem>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryMenu;
