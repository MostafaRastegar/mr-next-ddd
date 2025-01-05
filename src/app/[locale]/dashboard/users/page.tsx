'use client';

import { Suspense } from 'react';
import { UsersContextProvider } from './_viewModule/users.context';
import { UsersView } from './_viewModule/users.view';

export default function UserPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: 'center' }}>loading... on initial request</p>
      }
    >
      <UsersContextProvider>
        <UsersView />
      </UsersContextProvider>
    </Suspense>
  );
}
