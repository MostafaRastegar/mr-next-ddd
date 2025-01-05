import { chain } from 'papak/middlewares/chain';
import { withAuthentication } from 'papak/middlewares/withAuthentication';
import { withIntl } from 'papak/middlewares/withIntl';

export default chain([withIntl, withAuthentication]);

export const config = {
  matcher: ['/login', '/', '/(fa|en)/:path*'],
};
