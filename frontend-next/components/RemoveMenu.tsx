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
  name: string;
  callback: () => void;
}

const dummyInventory: IComposable[] = [castle, farm];

const BuildMenu: React.FC<Props> = ({ name, callback }) => {
  return (
    <div className="p-2 rounded-xl bg-white text-black">
      <div className="flex justify-between">
        <ArrowButton right={false} />
        <h2 className="font-unifraktur text-2xl text-center mb-1">{name}</h2>
        <ArrowButton right={true} />
      </div>

      {dummyInventory.map((item, index) => {
        return (
          <ComposableItem
            key={index}
            composable={item}
            action={action.REMOVE}
            display={display.MIN}
          ></ComposableItem>
        );
      })}
    </div>
  );
};

export default BuildMenu;
