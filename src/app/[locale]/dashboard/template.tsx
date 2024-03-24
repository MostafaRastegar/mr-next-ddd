'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { ConfigProvider, theme } from 'antd';
import { Layout } from 'antd';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { ThemeContextProvider } from '@/contexts/Theme';

const { defaultAlgorithm, darkAlgorithm } = theme;

function _tailWindDarkModeHandle(isDarkLocalStorage: boolean) {
  if (isDarkLocalStorage) {
    window.document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    window.document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  return isDarkLocalStorage;
}

function _multiLanguageRedirect(pathname: string, rtl: boolean) {
  const redirectPath = pathname
    .split('/')
    .map((item, index) => {
      if (index === 1) {
        return rtl ? 'fa' : 'en';
      }
      return item;
    })
    .join('/');

  return redirect(redirectPath);
}

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRtlMode, setIsRtlMode] = useState(false);

  const handleThemeMode = () => {
    setIsDarkMode(!isDarkMode);
    _tailWindDarkModeHandle(!isDarkMode);
  };

  const handleThemeDirection = () => {
    setIsRtlMode((previousValue) => {
      localStorage.setItem('rtl', `${!previousValue}`);
      _multiLanguageRedirect(pathname, !previousValue);
      return !previousValue;
    });
  };

  useEffect(() => {
    const isDarkLocalStorage = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(isDarkLocalStorage);
    _tailWindDarkModeHandle(isDarkLocalStorage);

    const isRTLLanguageLocalStorage = localStorage.getItem('rtl') === 'true';
    setIsRtlMode(isRTLLanguageLocalStorage);
  }, []);

  return (
    <ConfigProvider
      direction={isRtlMode ? 'rtl' : 'ltr'}
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <ThemeContextProvider value={isDarkMode ? 'dark' : 'light'}>
        <Layout className="flex min-h-screen flex-row">
          <div className="flex min-h-screen">
            <SideBar />
          </div>
          <div className="flex min-h-screen w-full flex-col">
            <Header
              handleThemeMode={handleThemeMode}
              isDarkMode={isDarkMode}
              handleThemeDirection={handleThemeDirection}
              isRtlMode={isRtlMode}
            />
            <div className="p-4">{children}</div>
            <Footer className="mt-auto" />
          </div>
        </Layout>
      </ThemeContextProvider>
    </ConfigProvider>
  );
}
