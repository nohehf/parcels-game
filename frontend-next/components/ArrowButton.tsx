import React from "react";
import AkarIconsChevronLeft from "./AkarIconsChevronLeft";
import AkarIconsChevronRight from "./AkarIconsChevronRight";
import ComposableItem from "./ComposableItem";

interface Props {
  right: boolean;
  callback: () => {};
}

const ArrowButton: React.FC<Props> = ({ right, callback }) => {
  if (right) {
    return (
      <button
        className="px-2 py-0.5 rounded-full bg-white border-black"
        onClick={callback}
      >
        {" "}
        <AkarIconsChevronRight />{" "}
      </button>
    );
  } else {
    return (
      <button className="px-2 py-0.5 rounded-full bg-white border-black">
        {" "}
        <AkarIconsChevronLeft onClick={callback} />{" "}
      </button>
    );
  }
};

export default ArrowButton;
