import { formatAddress } from "../hooks/utils";
import Avatar from "@davatar/react";
interface Props {
  address: string | undefined;
  me?: boolean;
}
const Address: React.FC<Props> = ({ address }) => {
  if (!address) return null;
  const formatedAddress = formatAddress(address);
  return (
    <div className="font-almendra flex items-center text-lg">
      <Avatar size={32} address={address} />
      <span className="text-base ml-1 mr-0.5">
        {formatedAddress.slice(undefined, 2)}
      </span>

      {formatedAddress.slice(2)}
    </div>
  );
};

export default Address;
