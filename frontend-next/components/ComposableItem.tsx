import React from "react";
import Link from "next/link";
import { action, display, Composable } from "../types/Composable";
import TwemojiCoin from "./TwemojiCoin";
import useBuyComposable from "../hooks/useBuyComposable";
interface Props {
  composable: Composable;
  Action: action;
  display: display;
  callback: () => void;
  number?: number;
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

const ComposableItem: React.FC<Props> = ({
  composable,
  Action,
  display,
  callback,
  number,
}) => {
  return (
    <div className="bg-white text-gray-800 p-2 font-almendra mb-3 rounded-xl flex items-center justify-between drop-shadow-xl">
      <div className="flex flex-col mr-2">
        <h2 className="font-unifraktur text-2xl">
          {number ? (
            <div className="bg-lime-500 text-white rounded-full text-sm w-5 h-5 mb-[-30px] mr-[-100px]">
              {number}
            </div>
          ) : null}

          {composable.name.toLowerCase()}
        </h2>
        <div className="flex items-center flex-col">
          {Action === action.CRAFT ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                +<TwemojiCoin className="mr-1" />
                {composable.boost} $res/day
              </div>
              <hr className="border-0.5 w-10 border-gray-300" />
              <div className="flex items-center">
                -
                <TwemojiCoin className="mr-1" />
                {composable.price} $res
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <TwemojiCoin className="mr-1" />
              {composable.boost} $res/day
            </div>
          )}

          <ComposableButton
            Action={Action}
            callback={callback}
          ></ComposableButton>
        </div>
      </div>
      <img src={`/castle.png`} alt="" className="h-[120px]" />
    </div>
  );
};

const ComposableButton: React.FC<{ Action: action; callback: () => void }> = ({
  Action,
  callback,
}) => {
  if (Action !== action.NONE) {
    return (
      <button
        className={
          "rounded-xl text-white font-unifraktur m-auto py-0.5 px-2 mt-1 " +
          buttonColor(Action)
        }
        onClick={callback}
      >
        {Action}
      </button>
    );
  } else {
    return null;
  }
};

export default ComposableItem;
