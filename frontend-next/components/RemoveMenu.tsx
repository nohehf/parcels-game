import React from "react";
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

const RemoveMenu: React.FC<Props> = ({ isOwner }) => {
  return (
    <div className="p-2 rounded-xl bg-white text-black w-full">
      <h2 className="font-unifraktur text-2xl mb-1">On parcel</h2>
      <div className="flex flex-wrap justify-between">
        {dummyInventory.map((item, index) => {
          return (
            <ComposableItem
              key={index}
              composable={item}
              Action={isOwner ? action.REMOVE : action.NONE}
              display={display.MIN}
            ></ComposableItem>
          );
        })}
      </div>
    </div>
  );
};

export default RemoveMenu;
