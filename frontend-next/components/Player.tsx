import Res from "./Res";

interface Props {}

const Player: React.FC<Props> = ({}) => {
  return (
    <div className="p-5 bg-white text-black flex flex-wrap justify-between font-almendra text-xl">
      Wallet: 0x......
      <Res amount={10}></Res>
    </div>
  );
};

export default Player;
