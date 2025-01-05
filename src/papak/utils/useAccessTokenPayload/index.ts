import Cookies from 'universal-cookie';
import { decode } from 'jsonwebtoken';

export function useAccessTokenPayload<T>(token:string):T {
  const cookieStore = new Cookies(null, { path: '/' });
  const access_token = cookieStore.get(token);
  return  decode(access_token) as T
  
}