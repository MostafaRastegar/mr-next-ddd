"use client";

import { type ReactNode, useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { ConfigProvider as ConfigProviderAntd, theme } from "antd";
import { useJalaliLocaleListener } from "antd-jalali";
import en_US from "antd/lib/locale/en_US";
import fa_IR from "antd/lib/locale/fa_IR";
import { AnyObject } from "papak/_utilsTypes";
import { ThemeContextProvider } from "papak/configs/themeContextProvider";
import { multiLanguageRedirect } from "./multiLanguageRedirect";
import { tailWindDarkModeHandle } from "./tailWindDarkModeHandle";

const { defaultAlgorithm, darkAlgorithm } = theme;

export function useThemeProvider() {
  useJalaliLocaleListener();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRtlMode, setIsRtlMode] = useState(false);

  const handleThemeMode = () => {
    setIsDarkMode(!isDarkMode);
    tailWindDarkModeHandle(!isDarkMode);
  };

  const handleThemeDirection = () => {
    setIsRtlMode((previousValue) => {
      localStorage.setItem("rtl", `${!previousValue}`);
      multiLanguageRedirect(pathname, !previousValue, redirect);
      return !previousValue;
    });
  };

  useEffect(() => {
    const isDarkLocalStorage = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDarkLocalStorage);
    tailWindDarkModeHandle(isDarkLocalStorage);

    const isRTLLanguageLocalStorage = localStorage.getItem("rtl") === "true";
    setIsRtlMode(isRTLLanguageLocalStorage);
  }, []);

  const ConfigProvider = ({
    children,
    customTheme,
    rtl,
  }: {
    children: ReactNode;
    customTheme?: AnyObject;
    rtl?: boolean;
  }) => (
    <ConfigProviderAntd
      direction={rtl || isRtlMode ? "rtl" : "ltr"}
      locale={rtl ? fa_IR : en_US}
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        ...customTheme,
      }}
    >
      <ThemeContextProvider value={isDarkMode ? "dark" : "light"}>
        {children}
      </ThemeContextProvider>
    </ConfigProviderAntd>
  );

  return {
    ConfigProvider,
    handleThemeMode,
    handleThemeDirection,
    isDarkMode,
    isRtlMode,
    setIsRtlMode,
  };
}
