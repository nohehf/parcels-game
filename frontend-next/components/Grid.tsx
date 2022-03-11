import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import GridParcel from "./GridParcel";
import { stringify } from "querystring";
import { gridSize } from "../settings";
import useParcelGrid from "../hooks/useParcelGrid";

interface Props {
  //parcels: number[][];
}

const Grid = (props: Props) => {
  const parcelGrid = useParcelGrid();
  if (parcelGrid.data) {
    return (
      <div className="w-full">
        {parcelGrid.data.map((col, i) => {
          return (
            <div key={i} className="flex">
              {col.map((parcel, j) => (
                <div key={"" + i + j} className={"m-1"}>
                  <GridParcel parcel={parcel}></GridParcel>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <>loading....</>;
  }
};

export default Grid;
