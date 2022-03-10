import { useAccount } from "wagmi";
import usePlayer from "../hooks/usePlayer";
import { formatAddress } from "../hooks/utils";
import Res from "./Res";

interface Props {}

const Player: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  const playerQuery = usePlayer();
  return (
    <div className="p-5 bg-white text-black flex flex-wrap justify-between font-almendra text-xl">
      Wallet:
      {formatAddress(data?.address)}
      <Res amount={playerQuery.data}></Res>
    </div>
  );
};

export default Player;
