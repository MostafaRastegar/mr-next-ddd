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
    async getCurrentUser() {
      const userData: UserCurrent | null = await UserService.getUser();
      if (userData) {
        const { user } = userData;
        return user;
      }
      return null;
    },
    async userRegister(params: UserRegisterParams) {
      const requestBody: UserRegisterUserParams = {
        user: params,
      };
      const userData = await UserService.register(requestBody);
      return userData;
    },

    async userLogin(params: UserLoginParams) {
      const requestBody: UserLoginUserParams = {
        user: params,
      };
      const userData = await UserService.login(requestBody);

      return userData;
    },

    async userUpdate(email: string) {
      const requestBody: UserUpdateUserParams = {
        user: { email },
      };
      const userData = await UserService.update(requestBody);
      return userData;
    },
  };
}

export default UserController;
