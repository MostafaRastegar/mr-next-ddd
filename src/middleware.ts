import { chain } from '@/boilerplate/middlewares/chain';
import { withAuthentication } from '@/boilerplate/middlewares/withAuthentication';
import { withIntl } from '@/boilerplate/middlewares/withIntl';

export default chain([withIntl, withAuthentication]);

export const config = {
  matcher: ['/login', '/', '/(fa|en)/:path*'],
};
