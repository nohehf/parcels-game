import { useAccount } from "wagmi";
import usePlayer from "../hooks/usePlayer";
import { formatAddress } from "../hooks/utils";
import Res from "./Res";

interface Props {}

const Player: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  const playerQuery = usePlayer();
  return (
    <div className="bg-white text-black flex justify-between items-center font-almendra text-xl">
      Wallet:
      {formatAddress(data?.address)}
      &nbsp; &nbsp; &nbsp;
      <Res amount={playerQuery.data}></Res>
    </div>
  );
};

export default Player;
