import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { CustomMiddleware } from '../chain';

export function withIntl(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const intl = createMiddleware({
      // A list of all locales that are supported
      locales: ['en', 'fa'],

      // Used when no locale matches
      defaultLocale: 'en',
    });

    const response = intl(request) as NextResponse;
    return middleware(request, event, response);
  };
}
