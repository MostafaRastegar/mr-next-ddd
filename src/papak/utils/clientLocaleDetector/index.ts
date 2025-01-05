'use client';

import { getCookie } from "../clientUniversalCookie";

export const clientLocaleDetector = () => {
  const localeKey = getCookie('NEXT_LOCALE');
  if (!localeKey) return 'en';
  return localeKey
}
