'use client';

import { Suspense } from 'react';
import { LoginView } from './_viewModule/Login.view';
import { useLoginVM } from './_viewModule/useLogin.vm';

const LoginWrapper = () => {
  const { isPending, onFinish } = useLoginVM();
  return <LoginView onFinish={onFinish} isPending={isPending} />;
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: 'center' }}>loading... on initial request</p>
      }
    >
      <LoginWrapper />
    </Suspense>
  );
}
