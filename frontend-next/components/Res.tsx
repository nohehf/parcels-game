import React from "react";
import TwemojiCoin from "./TwemojiCoin";

interface Props {
  amount: number;
}

const Res: React.FC<Props> = ({ children, amount }) => {
  return (
    <div className="flex items-center font-almendra text-lg">
      <TwemojiCoin className="mr-1" />
      {amount + " "} $res
      {children}
    </div>
  );
};

export default Res;
