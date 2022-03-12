import Avatar from "@davatar/react/dist/Image";
import { useAccount } from "wagmi";
import { useBalanceEvents } from "../hooks/useEvents";
import usePlayer from "../hooks/usePlayer";
import { formatAddress } from "../hooks/utils";
import Address from "./Address";
import Res from "./Res";

interface Props {}

const Player: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  useBalanceEvents();
  const playerQuery = usePlayer();
  return (
    <div className="text-white flex  justify-end items-center font-almendra text-lg">
      <div className="bg-blue-900 bg-opacity-40 p-1 px-2 font-unifraktur rounded-xl mr-3 mt-1">
        <Res amount={playerQuery.data}></Res>
      </div>

      <div className="bg-blue-900 bg-opacity-40 p-1 px-2 font-almendra rounded-xl mr-1 mt-1">
        <Address address={data?.address} />
      </div>
    </div>
  );
};

export default Player;
