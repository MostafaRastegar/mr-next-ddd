import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
// import { verifyJwtToken } from 'papak/helpers/auth';
import { CustomMiddleware } from '../chain';

const AUTH_PAGES = ['/login', '/register', '/'];
const isAuthPages = (url: string) => AUTH_PAGES.includes(url);

export function withAuthentication(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // return middleware(request, event, response);

    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get('access_token') ?? { value: null };
    const { value: NEXT_LOCALE } = cookies.get('NEXT_LOCALE') ?? {
      value: 'en',
    };

    const hasVerifiedToken = token;

    const isAuthPageRequested = isAuthPages(nextUrl.pathname);

    if (isAuthPageRequested) {
      if (!hasVerifiedToken) {
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        return middleware(request, event, response);
      }

      const response = NextResponse.redirect(
        new URL(`/${NEXT_LOCALE}/dashboard`, url),
      );
      return middleware(request, event, response);
    }

    if (!hasVerifiedToken) {
      const searchParams = new URLSearchParams(nextUrl.searchParams);
      searchParams.set('next', nextUrl.pathname);

      const response = NextResponse.redirect(
        new URL(`/login?${searchParams}`, url),
      );
      response.cookies.delete('access_token');
      return middleware(request, event, response);
    }
    return middleware(request, event, response);
  };
}
