import { notFound } from 'next/navigation';
import { getRequestConfig as getRequestConfigBoilerplate } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'fa'];

export default getRequestConfigBoilerplate(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../constants/messages/${locale}.json`)).default,
  };
});
