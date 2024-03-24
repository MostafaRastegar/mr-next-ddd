import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ResponseObject } from '@/modules/_modulesTypes';
import type {
  User,
  UserCreateParams,
  UserLoginParams,
} from '../../domains/models/User';
import { UserRepository } from '../../infrastructure';
import UserService from '../../services/UserService';
import UserController from '../controllers/UserController';

const userService = UserService(UserRepository);
const userController = UserController(userService);

export function UserReactQuery() {
  return {
    useGetCurrentUser: () =>
      useQuery<ResponseObject<User>>({
        queryKey: ['User'],
        queryFn: userController.getCurrentUser,
      }),

    useUserLogin: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: () => {
          const rawFormData: UserLoginParams = {
            user: {
              email: '{{EMAIL}}',

              password: '{{PASSWORD}}',
            },
          };
          return userController.login(rawFormData);
        },
        onSuccess(response) {
          console.log('onSuccess :>> ', response);
          const nextUrl = searchParams.get('next');
          router.push(nextUrl ?? '/');
        },
        onError(error) {
          console.log('error :>> ', error);
        },
      });
    },

    useUserRegister: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: () => {
          const rawFormData: UserCreateParams = {
            email: '{{EMAIL}}',
            password: '{{PASSWORD}}',
          };
          return userController.register(rawFormData);
        },
        onSuccess(response) {
          console.log('onSuccess :>> ', response);
          const nextUrl = searchParams.get('next');
          router.push(nextUrl ?? '/');
        },
        onError(error) {
          console.log('error :>> ', error);
        },
      });
    },
  };
}
