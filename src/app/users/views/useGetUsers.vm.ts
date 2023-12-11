import UserReactQuery from "@/modules/users/presentations/reactQuery/UserReactQuery";

const { useGetCurrentUser } = UserReactQuery();
function useGetUsersVM() {
  const { isLoading, data, isError, error } = useGetCurrentUser();
  console.log("useGetUsersVM :>> ", {
    error: error,
    isError,
  });
  return {
    isLoading,
    data,
  };
}

export default useGetUsersVM;
