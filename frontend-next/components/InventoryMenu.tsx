import React from "react";
import { useInventoryEvents } from "../hooks/useEvents";
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
  posX: number;
  posY: number;
}

const dummyInventory: IComposable[] = [castle, farm];

const InventoryMenu: React.FC<Props> = ({ isOwner, posX, posY }) => {
  useInventoryEvents();
  const inventory = useInventory();
  const placeComposableMutation = usePlaceComposable();
  const buttonCallback = (tokenId: number) => {
    placeComposableMutation.mutateAsync({
      posX: posX,
      posY: posY,
      tokenId: tokenId,
    });
  };
  return (
    <div className="text-gray-700 w-full">
      <h2 className="font-unifraktur text-2xl mb-1">Inventory</h2>
      <div className="flex flex-wrap justify-between">
        {inventory.data?.map((item, index) => {
          return (
            <ComposableItem
              key={index}
              composable={item.composable}
              number={item.amount}
              Action={isOwner ? action.BUILD : action.NONE}
              Display={display.MIN}
              callback={() => buttonCallback(item.composable.tokenId)}
            ></ComposableItem>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryMenu;
