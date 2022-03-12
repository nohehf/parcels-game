import React, { Dispatch, SetStateAction } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import GridParcel from "./GridParcel";
import { stringify } from "querystring";
import { gridSize } from "../settings";
import useParcelGrid from "../hooks/useParcelGrid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Parcel } from "../types/Composable";

interface Props {
  //parcels: number[][];
  selected: null | Parcel;
  setSelected: Dispatch<SetStateAction<Parcel | null>>;
}

const Grid = ({ selected, setSelected }: Props) => {
  const parcelGrid = useParcelGrid();
  if (parcelGrid.data) {
    return (
      <TransformWrapper>
        <TransformComponent>
          {parcelGrid.data && (
            <div className="w-full">
              {parcelGrid.data.map((col, i) => {
                return (
                  <div key={i} className="flex">
                    {col.map((parcel, j) => (
                      <GridParcel
                        key={i + "," + j}
                        parcel={parcel}
                        selected={selected}
                        setSelected={setSelected}
                      ></GridParcel>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </TransformComponent>
      </TransformWrapper>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Grid;
