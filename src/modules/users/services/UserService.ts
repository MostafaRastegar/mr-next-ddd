import Cookies from 'universal-cookie';
import { serviceHandler } from '@/helpers/serviceHandler';
import type {
  UserCurrent,
  UserLogin,
  UserLoginUserParams,
  UserRegister,
  UserRegisterUserParams,
  UserUpdate,
  UserUpdateUserParams,
} from '@/modules/users/domains/models/User';
import { IUserRepository } from '@/modules/users/domains/repositories/IUserRepository';
import { IUserService } from './IUserService';

const cookies = new Cookies(null, { path: '/' });

function UserService(
  UserRepository: IUserRepository,
  redirect?: Function,
): IUserService {
  return {
    getUser: () => serviceHandler<UserCurrent>(UserRepository.findByToken),

    login: (body: UserLoginUserParams) =>
      serviceHandler<UserLogin>(
        () => UserRepository.findByEmailAndPassword(body),
        {
          onSuccess: (response) => {
            console.log('service onSuccess :>> ', response);
            const token = response?.data.user?.token;
            if (token) {
              cookies.set('access_token', token);
            }
          },
        },
      ),

    register: (body: UserRegisterUserParams) =>
      serviceHandler<UserRegister>(() => UserRepository.create(body), {
        onSuccess: (response) => {
          const token = response?.data.user?.token;
          if (cookies && token && redirect) {
            cookies.set('access_token', token);
            redirect('/users');
          }
          return response;
        },
      }),

    update: (body: UserUpdateUserParams) =>
      serviceHandler<UserUpdate>(() => UserRepository.update(body)),
  };
}

export default UserService;
