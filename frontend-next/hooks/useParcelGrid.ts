import { useQuery } from "react-query";
import { gridSize } from "../settings";
import useParcelContract from "./useParcelContract";

const useParcelGrid = () => {
  const contract = useParcelContract();
  return useQuery(["parcelGrid", { chainId: contract.chainId }], () =>
    contract.getParcelGrid(gridSize[0], gridSize[1])
  );
};

export default useParcelGrid;
