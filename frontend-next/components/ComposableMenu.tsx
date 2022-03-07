import React, { useState } from "react";
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

const menus = [
  { name: "Inventaire", act: action.BUILD },
  { name: "Craft", act: action.CRAFT },
  { name: "Remove", act: action.REMOVE },
];

const ComposableMenu: React.FC<Props> = ({ name }) => {
  const [menu, setMenu] = useState(menus[0]);
  const [menuIndex, setMenuIndex] = useState(0);

  const changeMenu = async (forward: boolean) => {
    await setMenuIndex((forward ? menuIndex + 1 : menuIndex - 1) % 3);
    setMenu(menus[menuIndex]);
  };

  return (
    <div className="p-2 rounded-xl bg-white text-black">
      <div className="flex justify-between">
        <ArrowButton
          right={false}
          callback={
            (() => {
              changeMenu(false);
            }) as () => {}
          }
        />
        <h2 className="font-unifraktur text-2xl text-center mb-1">
          {menu.name}
        </h2>
        <ArrowButton
          right={true}
          callback={
            (() => {
              changeMenu(true);
            }) as () => {}
          }
        />
      </div>

      {dummyInventory.map((item, index) => {
        return (
          <ComposableItem
            key={index}
            composable={item}
            action={action.BUILD}
            display={display.MIN}
          ></ComposableItem>
        );
      })}
    </div>
  );
};

export default ComposableMenu;
