import type { IUserService } from "@/modules/users/applications/services/IUserService";
import type {
  UserLoginParams,
  UserRegisterParams,
  UserCurrent,
  UserRegisterUserParams,
  UserLoginUserParams,
  UserUpdateUserParams,
} from "@/modules/users/domains/models/User";
function UserController(UserService: IUserService) {
  return {
    getUsers: async () => {
      const userData = await UserService.getUsers();
      return userData;
    },
    getCurrentUser: async () => {
      const userData: UserCurrent | any = await UserService.getUser();
      return userData.user;
    },
    userRegister: async (params: UserRegisterParams) => {
      const requestBody: UserRegisterUserParams = {
        user: params,
      };
      const userData = await UserService.register(requestBody);
      return userData;
    },

    userLogin: async (params: UserLoginParams) => {
      const requestBody: UserLoginUserParams = {
        user: params,
      };
      const userData = await UserService.login(requestBody);

      return userData;
    },

    userUpdate: async (email: string) => {
      const requestBody: UserUpdateUserParams = {
        user: { email },
      };
      const userData = await UserService.update(requestBody);
      return userData;
    },
  };
}

export default UserController;
