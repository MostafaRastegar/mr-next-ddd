import type { IUserService } from "@/modules/users/applications/services/IUserService";
import type {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserLoginParams,
  UserRegisterParams,
  UserCurrent,
} from "@/modules/users/domains/models/User";

function UserController(UserService: IUserService) {
  return {
    async userRegister(params: UserRegisterParams) {
      const requestBody: UserRegister = {
        user: params,
      };
      const userData = await UserService.register(requestBody);
      return userData;
    },

    async getCurrentUser() {
      const userData: UserCurrent | null = await UserService.getUser();
      if (userData) {
        const { user } = userData;
        return user;
      }
      return null;
    },

    async userLogin(params: UserLoginParams) {
      const requestBody: UserLogin = {
        user: params,
      };
      const userData = await UserService.login(requestBody);
      return userData;
    },

    async userUpdate(email: string) {
      const requestBody: UserUpdate = {
        user: { email },
      };
      const userData = await UserService.update(requestBody);
      return userData;
    },
  };
}

export default UserController;
