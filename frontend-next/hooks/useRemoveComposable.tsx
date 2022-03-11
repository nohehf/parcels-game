import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useAccount } from "wagmi";
import useItemContract from "./useItemContract";
import useParcelContract from "./useParcelContract";

interface UseRemoveComposablePayload {
  posX: number;
  posY: number;
  tokenId: number;
}

const useRemoveComposable = () => {
  const contract = useItemContract();
  const [{ data, error, loading }, disconnect] = useAccount();

  return useMutation(
    async ({ posX, posY, tokenId }: UseRemoveComposablePayload) => {
      if (!data?.address) return;
      contract.removeFromParcel(data?.address, tokenId, posX, posY);
    }
  );
};

export default useRemoveComposable;
