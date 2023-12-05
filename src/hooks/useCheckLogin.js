import { useLayoutEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import routers from '@/constants/routers';

const useCheckLogin = (redirect = true) => {
  const accessToken = Cookies.get('accessToken');
  useLayoutEffect(() => {
    if (redirect && !accessToken) {
      Router.push(routers.SIGN_IN.otp_pin);
    }
  });
  return accessToken ? true : false;
};

export default useCheckLogin;
