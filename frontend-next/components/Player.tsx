import { useAccount } from "wagmi";
import usePlayer from "../hooks/usePlayer";
import Res from "./Res";

interface Props {}

const Player: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  const playerQuery = usePlayer();
  return (
    <div className="p-5 bg-white text-black flex flex-wrap justify-between font-almendra text-xl">
      Wallet: {data?.address.substring(0, 4)}....{data?.address.substring(42-4)}
      <Res amount={playerQuery.data}></Res>
    </div>
  );
};

export default Player;
