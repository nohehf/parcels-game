import { useQuery } from "react-query";
import useItemContract from "./useItemContract";

const useComposables = () => {
  const contract = useItemContract();
  return useQuery(["composables", { chainId: contract.chainId }], () =>
    contract.getAllComposables()
  );
};

export default useComposables;
