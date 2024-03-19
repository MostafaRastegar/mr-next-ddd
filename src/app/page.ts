import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootPage() {
  const cookieStore = cookies();
  const { value: NEXT_LOCALE } = cookieStore.get('NEXT_LOCALE') ?? {
    value: 'en',
  };
  redirect(`/${NEXT_LOCALE}/dashboard`);
}
