'use client';

import { JwtPayload, decode } from 'jsonwebtoken';
import { DispatchSetStateAction } from 'papak/_utilsTypes';
import { serviceHandler } from 'papak/helpers/serviceHandler';
import { requestWithoutAuth } from 'papak/utils/request';
import { dateToSeconds } from 'papak/utils/time';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const POST_REFRESH_TOKEN_URL =
  process.env.NEXT_PUBLIC_HOST_URL + process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL!;

const POST_BLACKLIST_TOKEN_URL =
  process.env.NEXT_PUBLIC_HOST_URL +
  process.env.NEXT_PUBLIC_BLACKLIST_TOKEN_URL!;

export const refreshToken = async () => {
  const refresh_token = cookies.get('refresh_token');
  return serviceHandler<{ access: string }>(
    () =>
      requestWithoutAuth().post(POST_REFRESH_TOKEN_URL, {
        refresh: refresh_token,
      }),
    {
      onSuccess(response) {
        const access_token = response?.data?.access;
        if (access_token !== undefined) {
          const decodeAccessToken = decode(access_token) as JwtPayload;
          if (decodeAccessToken.exp) {
            const expireDate = new Date(decodeAccessToken.exp);
            cookies.set('access_token', access_token, {
              maxAge: dateToSeconds(expireDate),
            });
          }
        }
      },
      onError() {
        cookies.remove('refresh_token');
        cookies.remove('access_token');
      },
    },
  );
};

export const blackListToken = async (
  setLoading: DispatchSetStateAction<boolean>,
) => {
  const refresh_token = cookies.get('refresh_token');
  return serviceHandler<{ access: string }>(
    () => {
      setLoading(true);
      return requestWithoutAuth().post(POST_BLACKLIST_TOKEN_URL, {
        refresh: refresh_token,
      });
    },
    {
      onSuccess() {
        cookies.remove('refresh_token');
        cookies.remove('access_token');
        if (!!window) {
          setTimeout(() => {
            window?.location?.reload();
            setLoading(false);
          }, 1500);
        }
      },
      onError() {
        cookies.remove('refresh_token');
        cookies.remove('access_token');
        if (!!window) {
          setLoading(false);
          window?.location?.reload();
        }
      },
    },
  );
};
