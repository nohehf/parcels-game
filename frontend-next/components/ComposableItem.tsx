import React from "react";
import Link from "next/link";
import { action, display, Composable } from "../types/Composable";
import TwemojiCoin from "./TwemojiCoin";
import useBuyComposable from "../hooks/useBuyComposable";
interface Props {
  composable: Composable;
  Action: action;
  Display: display;
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
  Display,
  callback,
  number,
}) => {
  return (
    <div className="bg-white text-gray-800 p-2 font-almendra mt-1 mb-1 rounded-xl flex items-center justify-between drop-shadow-xl">
      <div className="flex flex-col mr-2">
        {number ? (
          <div className="bg-lime-500 text-white rounded-full w-6 h-6 text-center leading-none text-xl align-text-top mt-[-20px] mb-[-15px] ml-[-20px]">
            {number}
          </div>
        ) : null}
        <h2 className=" text-center text-xl mt-[-5px]">
          {composable.name.toLowerCase()}
        </h2>
        <div className="flex items-center flex-col">
          {Display === display.FULL ? (
            <div className="flex flex-col ">
              <div className="flex text-left items-center">
                <span className="w-1 mr-1">+</span>&nbsp;
                <TwemojiCoin className="mr-1" />
                {composable.boost} $res/day
              </div>
              <hr className="border-0.5 w-10 border-gray-300 m-auto" />
              <div className="flex text-left items-center">
                <span className="w-1 mr-1">⎻</span>&nbsp;
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

const ComposableButton: React.FC<{
  Action: action;
  callback: () => void;
}> = ({ Action, callback }) => {
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
