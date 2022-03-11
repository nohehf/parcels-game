import { useQuery } from "react-query";
import useParcelContract from "./useParcelContract";

interface UseParcelComposablesQuery {
  posX: number;
  posY: number;
}

const useParcelComposables = ({ posX, posY }: UseParcelComposablesQuery) => {
  const contract = useParcelContract();
  return useQuery(
    ["parcelComposables", { posX, posY, chainId: contract.chainId }],
    () => contract.getParcelComposables(posX, posY)
  );
};

export default useParcelComposables;
