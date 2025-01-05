'use client';

import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

export const getCookie = (key: string) => {
  const  cookie =  cookies.get(key);
  if (!cookie){
    return  null;
  }
  return  cookie;
}

