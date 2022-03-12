import React from "react";
import { useParcelEvents } from "../hooks/useEvents";
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

const RemoveMenu: React.FC<Props> = ({ isOwner, posX, posY }) => {
  useParcelEvents(posX, posY);
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
    <div className="text-gray-700 w-full">
      <div className="flex flex-wrap justify-between">
        {parcelComposables.data &&
          parcelComposables.data.map((item, index) => {
            return (
              <ComposableItem
                key={index}
                composable={item.composable}
                Action={isOwner ? action.REMOVE : action.NONE}
                Display={display.MIN}
                number={item.amount}
                callback={() => buttonCallback(item.composable.tokenId)}
              ></ComposableItem>
            );
          })}
        {parcelComposables.data?.length === 0 && (
          <div className="my-10 text-center font-almendra text-xl m-auto">
            Nothing on your parcel... <br /> Try building someting on it !
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveMenu;
