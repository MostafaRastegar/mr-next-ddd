import { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
import { IUserService } from "./IUserService";
import JsCookies from "js-cookie";
import type {
  UserUpdate,
  UserCurrent,
  UserLoginUserParams,
  UserRegisterUserParams,
  UserUpdateUserParams,
} from "@/modules/users/domains/models/User";
import { AxiosError } from "axios";

const cookiesClient = () => JsCookies;
function UserService(
  UserRepository: IUserRepository,
  redirect?: Function,
  cookies: Function = cookiesClient
): IUserService {
  return {
    getUser: async (): Promise<UserCurrent | AxiosError> => {
      const userData = await UserRepository.findByToken();
      return userData;
    },

    login: async (
      body: UserLoginUserParams
    ): Promise<UserCurrent | AxiosError> => {
      const userData = await UserRepository.findByEmailAndPassword(body);
      const token = userData?.user?.token;
      if (token && redirect && cookies) {
        await cookies().set("access_token", token);
        redirect("/users");
      }
      return userData;
    },

    register: async (
      body: UserRegisterUserParams
    ): Promise<UserCurrent | AxiosError> => {
      const userData = await UserRepository.create(body);
      const token = userData?.user?.token;
      if (cookies && token && redirect) {
        await cookies().set("access_token", token);
        redirect("/users");
      }
      return userData;
    },

    update: async (
      body: UserUpdateUserParams
    ): Promise<UserUpdate | AxiosError> => {
      const userData = await UserRepository.update(body);
      return userData;
    },
  };
}

export default UserService;
