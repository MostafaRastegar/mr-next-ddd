'use client';

import { UsersPresentation } from '@/modules/users/Users.presentation';

export function useLoginVM() {
  const { useUserLoginMock } = UsersPresentation();

  const { mutate, isPending } = useUserLoginMock();

  const onFinish = (formData: { email: string; password: string }) => {
    const body = { user: formData };
    return mutate(body);
  };

  return { onFinish, isPending };
}
