import type {
  UserCreateParams,
  UserLoginParams,
  UserUpdateParams,
} from '../../domains/models/User';
import type { IUserService } from '../../services/IUserService';

function UserController(UserService: IUserService) {
  return {
    getCurrentUser: () => UserService.getCurrentUser(),

    register: (params: UserCreateParams) => {
      return UserService.register(params);
    },

    update: (email: string) => {
      const requestBody: UserUpdateParams = {
        email,
      };
      return UserService.update(requestBody);
    },

    login: (params: UserLoginParams) => {
      return UserService.login(params);
    },

    remove: (id: string) => {
      return UserService.remove(id);
    },
  };
}

export default UserController;
