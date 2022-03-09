import { useQuery } from "react-query";
import useParcelContract from "./useParcelContract"

interface UseCommentsQuery {
  topic: string;
}

const useParcelGrid = ({ topic }: UseCommentsQuery) => {
  const contract = useParcelContract();
  return useQuery(["parcelGrid", { topic, chainId: contract.chainId }], () =>
    contract.getParcelGrid(5,5)
  );
};

export default useParcelGrid
