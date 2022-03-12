import { useAccount } from "wagmi";
import { useBalanceEvents } from "../hooks/useEvents";
import usePlayer from "../hooks/usePlayer";
import { formatAddress } from "../hooks/utils";
import Res from "./Res";

interface Props {}

const Player: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  useBalanceEvents();
  const playerQuery = usePlayer();
  return (
    <div className="text-white flex  justify-end items-center font-almendra text-lg">
      <div className="bg-blue-900 bg-opacity-40 p-1 font-unifraktur rounded-xl mr-3 mt-1">
        <Res amount={playerQuery.data}></Res>
      </div>

      <div className="bg-blue-900 bg-opacity-40 p-1 font-almendra rounded-xl mr-1 mt-1">
        {formatAddress(data?.address)}
      </div>
    </div>
  );
};

export default Player;
