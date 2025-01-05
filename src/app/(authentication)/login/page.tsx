'use client';

import { Suspense } from 'react';
import { LoginView } from './_viewModule/login.view';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: 'center' }}>loading... on initial request</p>
      }
    >
      <LoginView />
    </Suspense>
  );
}
