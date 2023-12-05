/**
 * @function
 * @name useQueryParam
 * @description return object of url parameters
 */
import { useRouter } from "next/router";

const useQueryParam = () => {
  const router = useRouter();
  const { query } = router;
  return query;
};

export default useQueryParam;
