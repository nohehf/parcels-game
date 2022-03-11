import React from "react";
import useParcelComposables from "../hooks/useParcelComposables";
import useRemoveComposable from "../hooks/useRemoveComposable";
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

const RemoveMenu: React.FC<Props> = ({ isOwner, posX, posY }) => {
  const parcelComposables = useParcelComposables({
    posX: posX,
    posY: posY,
  });
  const removeComposableMutation = useRemoveComposable();
  const buttonCallback = (tokenId: number) => {
    removeComposableMutation.mutateAsync({
      posX: posX,
      posY: posY,
      tokenId: tokenId,
    });
  };
  return (
    <div className="rounded-xl bg-white text-black w-full">
      <h2 className="font-unifraktur text-2xl mb-1">On parcel</h2>
      <div className="flex flex-wrap justify-between">
        {parcelComposables.data &&
          parcelComposables.data.map((item, index) => {
            return (
              <ComposableItem
                key={index}
                composable={item.composable}
                Action={isOwner ? action.REMOVE : action.NONE}
                display={display.MIN}
                number={item.amount}
                callback={() => buttonCallback(item.composable.tokenId)}
              ></ComposableItem>
            );
          })}
      </div>
    </div>
  );
};

export default RemoveMenu;
