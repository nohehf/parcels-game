import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import { useAccount } from "wagmi";
import AudioPlayer from "./AudioPlayer";
import AuthButton from "./AuthButton";
import IcBaselineGridOn from "./IcBaselineGridOn";
import IcRoundHome from "./IcRoundHome";
import Player from "./Player";

interface Props {}
const Nav: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  return (
    <nav className="flex h-full p-0.5 px-2 justify-between items-center w-full text-white">
      <div className="flex text-xl w-[35%]">
        <div className="mr-3 bg-blue-900 bg-opacity-40 hover:bg-opacity-60 p-1 px-2 rounded-xl">
          <Link href={"/"}>
            <IcRoundHome />
          </Link>
        </div>
        <div className="bg-blue-900 bg-opacity-40 hover:bg-opacity-50 p-1 px-2 mr-3 rounded-xl">
          <Link href={"/"}>
            <IcBaselineGridOn />
          </Link>
        </div>
        <div className="bg-blue-900 bg-opacity-40 hover:bg-opacity-50 flex px-2 rounded-xl">
          <AudioPlayer />
        </div>
      </div>

      <h1 className="text-3xl font-unifraktur">
        Parcels <span className="font-sans text-xl align-top">™️</span>
      </h1>
      <div className="w-[35%]">
        {/* <Link href={"/wallet"}>Wallet</Link> */}
        {data?.address ? <Player /> : <AuthButton />}
      </div>
    </nav>
  );
};

export default Nav;
