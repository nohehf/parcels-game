import React from "react";
import Link from "next/link";
import { IComposable, action, display } from "../types/Composable";
import TwemojiCoin from "./TwemojiCoin";
interface Props {
  composable: IComposable;
  action: action;
  display: display;
}

const buttonColor = (Action: action) => {
  if (Action === action.REMOVE) {
    return "bg-red-400";
  } else if (Action === action.BUILD) {
    return "bg-purple-400";
  } else {
    return "bg-orange-400";
  }
};

const nsm =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aprifel.com%2Ffr%2Ffiche-nutritionnelle%2Fbanane%2F&psig=AOvVaw02ZOXgBY4Rbci3P68JJ3fV&ust=1646691383702000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCQ08nBsvYCFQAAAAAdAAAAABAG";

const ComposableItem: React.FC<Props> = ({ composable, action, display }) => {
  return (
    <div className="bg-white text-gray-800 p-2 font-almendra mb-3 rounded-xl flex items-center justify-between drop-shadow-xl">
      <div className="flex flex-col mr-2">
        <h2 className="font-unifraktur text-2xl">{composable.name}</h2>
        <div className="flex items-center">
          <TwemojiCoin className="mr-1" />
          {composable.income} $res/day
        </div>
        <button
          className={
            "rounded-xl text-white font-unifraktur m-auto py-0.5 px-2 mt-1 " +
            buttonColor(action)
          }
        >
          {action}
        </button>
      </div>
      <img src={`/castle.png`} alt="" className="h-[120px]" />
    </div>
  );
};

export default ComposableItem;
