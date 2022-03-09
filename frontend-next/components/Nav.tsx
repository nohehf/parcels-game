import Link from "next/link";
import AuthButton from "./AuthButton";

interface Props {}
const Nav: React.FC<Props> = ({}) => {
  return (
    <nav className="flex p-3 justify-between w-full text-black bg-white">
      <Link href={"/"}>Grid</Link>
      <h1 className="text-3xl font-unifraktur">
        Parcel <span className="font-sans text-xl align-top">™️</span>
      </h1>
      {/* <Link href={"/wallet"}>Wallet</Link> */}
      <AuthButton />
    </nav>
  );
};

export default Nav;
