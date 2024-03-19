import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ResponseObject } from '@/modules/_modulesTypes';
import {
  UserCurrent,
  UserLoginParams,
  UserRegisterParams,
} from '@/modules/users/domains/models/User';
import { UserRepository } from '@/modules/users/infrastructure';
import UserService from '@/modules/users/services/UserService';
import UserController from '../controllers/UserController';

const userService = UserService(UserRepository);
const userController = UserController(userService);

export function UserReactQuery() {
  return {
    useGetCurrentUser: () =>
      useQuery<ResponseObject<UserCurrent>>({
        queryKey: ['user'],
        queryFn: userController.getCurrentUser,
      }),

    useUserLogin: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: () => {
          const rawFormData: UserLoginParams = {
            email: '{{EMAIL}}',
            password: '{{PASSWORD}}',
          };
          return userController.userLogin(rawFormData);
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

    useUserRegister: () =>
      useMutation({
        mutationFn: (formData: FormData) => {
          const rawFormData: UserRegisterParams = {
            email: formData.get('email') as string,
            username: formData.get('username') as string,
            password: formData.get('password') as string,
          };
          return userController.userRegister(rawFormData);
        },
      }),
  };
}
