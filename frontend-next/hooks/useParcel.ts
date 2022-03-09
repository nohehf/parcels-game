import { useQuery } from "react-query";
import useParcelContract from "./useParcelContract"

interface UseParcelQuery {
  posX: number;
  posY: number;
}

const useParcel = ({ posX, posY }: UseParcelQuery) => {
  const contract = useParcelContract();
  return useQuery(["parcel", { posX, posY, chainId: contract.chainId }], () =>
    contract.getParcel(posX,posY)
  );
};

export default useParcel
