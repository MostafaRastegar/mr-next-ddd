// import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/boilerplate/globals.css';
import Providers from '@/boilerplate/utils/provider';

// const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export function RootLayoutBoilerplate({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <body className={inter.className}> */}
      <body>
        <Providers>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
