import type {
  UserLoginParams,
  UserLoginParams,
  UserRegisterParams,
  UserRegisterParams,
  UserUpdateParams,
} from '@/modules/users/domains/models/User';
import type { IUserService } from '@/modules/users/services/IUserService';

function UserController(UserService: IUserService) {
  return {
    getCurrentUser: () => UserService.getUser(),

    userRegister: (params: UserRegisterParams) => {
      return UserService.register(params);
    },

    userLogin: (params: UserLoginParams) => {
      const requestBody: UserLoginParams = {
        user: params,
      };
      return UserService.login(requestBody);
    },

    userUpdate: (email: string) => {
      const requestBody: UserUpdateParams = {
        user: { email },
      };
      return UserService.update(requestBody);
    },
  };
}

export default UserController;
