import type { IUserService } from "@/modules/users/applications/services/IUserService";
import type {
  UserLoginParams,
  UserRegisterParams,
  UserCurrent,
  UserRegisterUserParams,
  UserLoginUserParams,
  UserUpdateUserParams,
} from "@/modules/users/domains/models/User";
import toast from "react-hot-toast";
function UserController(UserService: IUserService) {
  return {
    async getCurrentUser() {
      const userData: UserCurrent | any = await UserService.getUser();
      return userData.user;
    },
    async userRegister(params: UserRegisterParams) {
      const requestBody: UserRegisterUserParams = {
        user: params,
      };
      try {
        const userData = await UserService.register(requestBody);
        return userData;
      } catch (error) {
        console.log("userRegister :>> ", error);
        return error;
      }
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
