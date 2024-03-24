import { UserReactQuery } from '@/modules/user/presentations/reactQuery/UserReactQuery';

const { useGetCurrentUser } = UserReactQuery();
function useGetUsersVM() {
  const { isPending, data } = useGetCurrentUser();

  return {
    isPending,
    data: data?.data,
  };
}

export default useGetUsersVM;
