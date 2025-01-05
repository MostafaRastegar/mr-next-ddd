import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PaginationParams } from 'papak/_modulesTypes';
import { OpenNotificationWithIcon } from 'papak/utils/useNotification';
import { UsersService } from './Users.service';
import {
  UserLoginParams,
  UsersCreateParams,
  UsersParams,
  UsersUpdateParams,
} from './domains/models/Users';

const Service = UsersService();

export function UsersPresentation(openNotification?: OpenNotificationWithIcon) {
  return {
    useGetAll: (params: UsersParams & PaginationParams) =>
      useQuery({
        queryKey: ['Users-results', ...Object.values(params || {})],
        queryFn: () => Service.getAll(params),
      }),

    useGet: (id: string) =>
      useQuery({
        queryKey: ['Users-result', id],
        queryFn: () => Service.get(id),
        enabled: !!id,
      }),

    useCreate: () => {
      return useMutation({
        mutationFn: (params: UsersCreateParams) => {
          return Service.create(params);
        },
      });
    },

    useUpdate: () => {
      return useMutation({
        mutationFn: (params: UsersUpdateParams) => {
          return Service.update(params);
        },
      });
    },

    useRemove: () => {
      return useMutation({
        mutationFn: ({ id }: { id: string }) => {
          return Service.remove(id);
        },
      });
    },

    useUserLogin: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: (params: UserLoginParams) => {
          return Service.login(params);
        },
        onSuccess() {
          const nextUrl = searchParams.get('next');
          router.push(nextUrl ?? '/');
        },
      });
    },

    useUserLoginMock: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: (params: UserLoginParams) => {
          // @ts-ignore
          return Service.loginMock(params);
        },
        onSuccess() {
          const nextUrl = searchParams.get('next');
          router.push(nextUrl ?? '/');
        },
      });
    },
  };
}
