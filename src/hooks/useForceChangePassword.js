import { useLayoutEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import routers from '@/constants/routers';

const useForceChangePassword = () => {
  const forceChangePassword = Cookies.get('forceChangePassword');
  useLayoutEffect(() => {
    if (forceChangePassword === 'true') {
      Router.push(`${routers.PASSWORD.change}?forceChangePassword=true`);
    }
  });
  return forceChangePassword ? true : false;
};

export default useForceChangePassword;
