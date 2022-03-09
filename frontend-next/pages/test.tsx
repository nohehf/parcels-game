import type { NextPage } from "next";
import useParcel from "../hooks/useParcel";
import useParcelGrid from "../hooks/useParcelGrid";

const Test: NextPage = () => {
  const parcel1 = useParcel({ posX: 1, posY: 1 });

  return (
    <div>
      Parcel 1,1:
      {JSON.stringify(parcel1.data)}
      <br />
    </div>
  );
};

export default Test;
