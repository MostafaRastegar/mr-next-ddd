import UserReactQuery from "@/modules/users/presentations/reactQuery/UserReactQuery";
import { User } from "@/modules/users/domains/models/User";

const { useGetAllUser } = UserReactQuery();
function useGetUsersVM() {
  const { isLoading, data } = useGetAllUser();
  console.log("data :>> ", data);
  return {
    isLoading,
    data,
  };
}

export default useGetUsersVM;
