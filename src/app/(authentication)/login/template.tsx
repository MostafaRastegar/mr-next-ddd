'use client';

import type { ReactNode } from 'react';
import { customTheme } from 'papak/configs/antdCustomTheme';
import { useThemeProvider } from 'papak/utils/useThemeProvider';

export default function Template({ children }: { children: ReactNode }) {
  const { ConfigProvider } = useThemeProvider();

  return <ConfigProvider customTheme={customTheme}>{children}</ConfigProvider>;
}
