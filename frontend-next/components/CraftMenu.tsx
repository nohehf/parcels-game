import React, { useState } from "react";
import useBuyComposable from "../hooks/useBuyComposable";
import useComposables from "../hooks/useComposables";
import useItemContract from "../hooks/useItemContract";
import useParcelContract from "../hooks/useParcelContract";
import usePlayer from "../hooks/usePlayer";
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

const CraftMenu: React.FC<Props> = ({ isOwner }) => {
  const buyComposableMutation = useBuyComposable();
  const parcelContract = useParcelContract();
  const buttonCallback = (name: string, price: number) => {
    buyComposableMutation.mutateAsync({ name, price });
  };
  const player = usePlayer();
  const composables = useComposables();
  return (
    <div className="text-gray-700 w-full">
      <h2 className="font-unifraktur text-2xl mb-1">Craft</h2>
      <div className="flex flex-wrap justify-between">
        {composables.data &&
          composables.data.map((item, index) => {
            return (
              <ComposableItem
                key={index}
                composable={item}
                Action={item.price <= player.data ? action.CRAFT : action.NONE}
                display={display.MIN}
                callback={() => buttonCallback(item.name, item.price)}
              ></ComposableItem>
            );
          })}
      </div>
    </div>
  );
};

export default CraftMenu;
