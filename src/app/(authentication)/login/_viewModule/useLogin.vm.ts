'use client';

import { UserReactQuery } from '@/modules/users/presentations/reactQuery/UserReactQuery';

export function useLoginVM() {
  const userReactQuery = UserReactQuery();

  const { mutate, isPending } = userReactQuery.useUserLogin();

  const onFinish = (values: { username: string; password: string }) => {
    return mutate();
  };

  return { onFinish, isPending };
}
