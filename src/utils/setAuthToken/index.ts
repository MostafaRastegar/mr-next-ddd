import Cookies from 'js-cookie';

export default function setAccessToken(token: string): void {
  Cookies.set('accessToken', token);
}
