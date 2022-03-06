import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import GridParcel from "./GridParcel";
import { stringify } from "querystring";

interface Props {
  //parcels: number[][];
}

const randomRotation = () => {
  return Math.floor(Math.random() * 4) * 90;
};

const col = 10;
const row = 10;

const GridCol = (props: { col: number }) => {
  return (
    <div>
      {[...Array(10)].map((e, i) => (
        <GridParcel
          key={i}
          parcel={{
            img: "./parcel_top.png",
            rotation: randomRotation(),
            id: "" + i + "," + props.col,
          }}
        ></GridParcel>
      ))}
    </div>
  );
};

const Grid = (props: Props) => {
  return (
    <div className="flex w-fit">
      {[...Array(10)].map((e, i) => (
        <GridCol key={i} col={i} />
      ))}
    </div>
  );
};

export default Grid;
