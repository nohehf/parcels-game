import Link from "next/link";
import { useAccount } from "wagmi";
import AuthButton from "./AuthButton";
import Player from "./Player";

interface Props {}
const Nav: React.FC<Props> = ({}) => {
  const [{ data, error, loading }, disconnect] = useAccount();
  return (
    <nav className="flex h-full p-0.5 px-2 justify-between w-full text-white bg-blue-900 bg-opacity-50">
      <Link href={"/"}>Grid</Link>
      <h1 className="text-3xl font-unifraktur">
        Parcel <span className="font-sans text-xl align-top">™️</span>
      </h1>
      {/* <Link href={"/wallet"}>Wallet</Link> */}
      {data?.address ? <Player /> : <AuthButton />}
    </nav>
  );
};

export default Nav;
