/**
 * @function
 * @name useQueryParam
 * @description return object of url parameters
 */
import { useRouter } from "next/router";

const useRoutePath = () => {
  const router = useRouter();
  return router.asPath
    .split("?")[0]
    .split("/")
    .filter((el) => !!el);
};

export default useRoutePath;
