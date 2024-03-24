'use client';

import { Suspense } from 'react';
import UserView from './_viewModule/User.view';
import useGetUsersVM from './_viewModule/useGetUsers.vm';

export default function ProfilePage() {
  const { data, isPending } = useGetUsersVM();
  const userData = data?.user;
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: 'center' }}>loading... on initial request</p>
      }
    >
      <UserView data={userData} isPending={isPending} />
    </Suspense>
  );
}
