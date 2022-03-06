import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";

const Parcel: NextPage = (params) => {
  const router = useRouter();
  return (
    <div className="App">
      <h1>
        parcel n°
        {" " + router.query.id}
      </h1>
    </div>
  );
};

export default Parcel;
