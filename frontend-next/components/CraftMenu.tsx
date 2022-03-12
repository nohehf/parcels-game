import React, { useState } from "react";
import { useAccount } from "wagmi";
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
      <div className="flex flex-wrap justify-around">
        {composables.data &&
          composables.data.map((item, index) => {
            return (
              <ComposableItem
                key={index}
                composable={item}
                Action={player.data > item.price ? action.CRAFT : action.NONE}
                Display={display.FULL}
                callback={() => buttonCallback(item.name, item.price)}
              ></ComposableItem>
            );
          })}
      </div>
    </div>
  );
};

export default CraftMenu;
