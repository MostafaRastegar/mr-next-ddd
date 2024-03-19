import type {
  UserLoginParams,
  UserLoginUserParams,
  UserRegisterParams,
  UserRegisterUserParams,
  UserUpdateUserParams,
} from '@/modules/users/domains/models/User';
import type { IUserService } from '@/modules/users/services/IUserService';

function UserController(UserService: IUserService) {
  return {
    getCurrentUser: () => UserService.getUser(),

    userRegister: (params: UserRegisterParams) => {
      const requestBody: UserRegisterUserParams = {
        user: params,
      };
      return UserService.register(requestBody);
    },

    userLogin: (params: UserLoginParams) => {
      const requestBody: UserLoginUserParams = {
        user: params,
      };
      return UserService.login(requestBody);
    },

    userUpdate: (email: string) => {
      const requestBody: UserUpdateUserParams = {
        user: { email },
      };
      return UserService.update(requestBody);
    },
  };
}

export default UserController;
