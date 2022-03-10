import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useParcelContract from "./useParcelContract";

interface UseClaimPayload {
  posX: number;
  posY: number;
}

const useClaim = () => {
  const contract = useParcelContract();

  return useMutation(async ({ posX, posY }: UseClaimPayload) => {
    contract.claim(posX, posY);
  });
};

export default useClaim;
