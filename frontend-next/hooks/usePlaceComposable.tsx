import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useAccount } from "wagmi";
import useItemContract from "./useItemContract";
import useParcelContract from "./useParcelContract";

interface UsePlaceComposablePayload {
  posX: number;
  posY: number;
  tokenId: number;
}

const usePlaceComposable = () => {
  const contract = useItemContract();
  const [{ data, error, loading }, disconnect] = useAccount();

  return useMutation(
    async ({ posX, posY, tokenId }: UsePlaceComposablePayload) => {
      if (!data?.address) return;
      contract.placeOnParcel(data?.address, tokenId, posX, posY);
    }
  );
};

export default usePlaceComposable;
