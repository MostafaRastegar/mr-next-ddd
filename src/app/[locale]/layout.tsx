import { NextIntlClientProvider, useMessages } from 'next-intl';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  // ...

  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <>
      {!!messages && (
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      )}
    </>
  );
}
