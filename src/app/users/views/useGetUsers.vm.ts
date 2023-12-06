import UserReactQuery from "@/modules/users/presentations/reactQuery/UserReactQuery";

const { useGetCurrentUser } = UserReactQuery();
function useGetUsersVM() {
  const { isLoading, data } = useGetCurrentUser();
  console.log("data :>> ", data);
  return {
    isLoading,
    data,
  };
}

export default useGetUsersVM;
