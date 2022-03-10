import { useMutation, QueryClient, useQueryClient } from "react-query";
import useParcelContract from "./useParcelContract";

interface UseBuyComposablePayload {
  name: string;
  price: number;
}

const useBuyComposable = () => {
  const queryClient = useQueryClient();
  const contract = useParcelContract();

  return useMutation(
    async ({ name, price }: UseBuyComposablePayload) => {
      return contract.buyComposable(name, price);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("player");
      },
    }
  );
};

export default useBuyComposable;
