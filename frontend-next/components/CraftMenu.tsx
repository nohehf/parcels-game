import React, { useState } from "react";
import useItemContract from "../hooks/useItemContract";
import useParcelContract from "../hooks/useParcelContract";
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

const CraftMenu: React.FC<Props> = ({ isOwner }) => {
  const itemContract = useItemContract();
  const [allNames, setAllNames] = useState([]);
  itemContract.getAllComposables().then((all) => setAllNames(all));
  return (
    <div className="p-2 rounded-xl bg-white text-black w-full">
      {JSON.stringify(allNames)}
      <h2 className="font-unifraktur text-2xl mb-1">Craft</h2>
      <div className="flex flex-wrap justify-between">
        {dummyInventory.map((item, index) => {
          return (
            <ComposableItem
              key={index}
              composable={item}
              Action={action.CRAFT}
              display={display.MIN}
            ></ComposableItem>
          );
        })}
      </div>
    </div>
  );
};

export default CraftMenu;
