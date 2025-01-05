import { JwtPayload, decode } from 'jsonwebtoken';
import { serviceHandler } from 'papak/helpers/serviceHandler';
import request, { requestWithoutAuth } from 'papak/utils/request';
import { dateToSeconds } from 'papak/utils/time';
import Cookies from 'universal-cookie';
import endpoints from '@/constants/endpoints';
import type { IUsersService } from './domains/IUsersService';
import { UserLoginParams } from './domains/models/Users';

const cookies = new Cookies(null, { path: '/' });

export function UsersService(): IUsersService {
  return {
    getAll: (params) =>
      serviceHandler(async () => {
        const result = await request().get(endpoints.USERS.GET_USERS(), {
          params,
        });
        return {
          ...result,
          data: { results: result.data, count: result.data?.length || 0 },
        };
      }),
    get: (id) =>
      serviceHandler(() => request().get(endpoints.USERS.GET_USERS_ID(id))),
    create: (params) =>
      serviceHandler(() =>
        request().post(endpoints.USERS.POST_USERS(), params),
      ),
    update: ({ id, ...params }) =>
      serviceHandler(() =>
        request().put(endpoints.USERS.PUT_USERS_ID(id?.toString()), params),
      ),
    remove: (id) =>
      serviceHandler(() =>
        request().delete(endpoints.USERS.DELETE_USERS_ID(id)),
      ),

    login: (params: UserLoginParams) =>
      serviceHandler(
        () =>
          requestWithoutAuth().post(endpoints.USERS.POST_USERS_LOGIN(), params),
        {
          onSuccess: (response) => {
            //@ts-ignore
            const access_token = response?.data.access;
            //@ts-ignore
            const refresh_token = response?.data.refresh;

            if (access_token !== undefined) {
              const decodeAccessToken = decode(access_token) as JwtPayload;
              if (decodeAccessToken.exp) {
                const expireDate = new Date(decodeAccessToken.exp);
                cookies.set('access_token', access_token, {
                  maxAge: dateToSeconds(expireDate),
                });
              }
            }
            if (refresh_token !== undefined) {
              const decodeAccessToken = decode(refresh_token) as JwtPayload;
              if (decodeAccessToken.exp) {
                const expireDate = new Date(decodeAccessToken.exp);
                cookies.set('refresh_token', refresh_token, {
                  maxAge: dateToSeconds(expireDate),
                });
              }
            }
          },
        },
      ),

    //@ts-ignore
    loginMock: (params: UserLoginParams) =>
      serviceHandler(
        () => requestWithoutAuth().get(endpoints.MOCK.POST_LOGIN()),
        {
          onSuccess: (response) => {
            // @ts-ignore
            const access_token = response?.data.access;
            if (access_token !== undefined) {
              cookies.set('access_token', access_token);
            }
          },
        },
      ),
  };
}
