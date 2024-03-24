import { chain } from '@/middlewares/chain';
import { withAuthentication } from '@/middlewares/withAuthentication';
import { withIntl } from './middlewares/withIntl';

export default chain([withIntl, withAuthentication]);

export const config = {
  matcher: ['/login', '/', '/(fa|en)/:path*'],
};
