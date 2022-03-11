import Link from "next/link";
import { useAccount } from "wagmi";
import AuthButton from "./AuthButton";
import IcBaselineGridOn from "./IcBaselineGridOn";
import IcRoundHome from "./IcRoundHome";
import Player from "./Player";

interface Props {}
const Nav: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  return (
    <nav className="flex h-full p-0.5 px-2 justify-between items-center w-full text-white bg-blue-900 bg-opacity-50">
      <div className="flex text-xl w-[35%]">
        <div className="mr-3">
          <Link href={"/"}>
            <IcRoundHome />
          </Link>
        </div>
        <div>
          <Link href={"/"}>
            <IcBaselineGridOn />
          </Link>
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
