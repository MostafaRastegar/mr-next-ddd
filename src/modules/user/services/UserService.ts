import Cookies from 'universal-cookie';
import { serviceHandler } from '@/helpers/serviceHandler';
import type {
  User,
  UserCreate,
  UserCreateParams,
  UserLoginParams,
  UserUpdate,
  UserUpdateParams,
} from '../domains/models/User';
import { IUserRepository } from '../domains/repositories/IUserRepository';
import { IUserService } from './IUserService';

const cookies = new Cookies(null, { path: '/' });

function UserService(
  UserRepository: IUserRepository,
  redirect?: Function,
): IUserService {
  return {
    getCurrentUser: () => serviceHandler<User>(UserRepository.findByToken),

    login: (body: UserLoginParams) =>
      serviceHandler<User>(() => UserRepository.findByEmailAndPassword(body), {
        onSuccess: (response) => {
          console.log('service onSuccess :>> ', response);
          const token = response?.data.user?.token;
          if (token) {
            cookies.set('access_token', token);
          }
        },
      }),

    update: (body: UserUpdateParams) =>
      serviceHandler<UserUpdate>(() => UserRepository.update(body)),

    remove: (id: string) =>
      serviceHandler<null>(() => UserRepository.delete(id)),

    register: (body: UserCreateParams) =>
      serviceHandler<UserCreate>(() => UserRepository.create(body), {
        onSuccess: (response) => {
          const token = response?.data.user?.token;
          if (cookies && token && redirect) {
            cookies.set('access_token', token);
            redirect('/');
          }
          return response;
        },
      }),
  };
}

export default UserService;
