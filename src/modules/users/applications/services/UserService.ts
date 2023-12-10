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
      try {
        const userData = await UserRepository.findByToken();
        return userData;
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    },

    login: async (
      body: UserLoginUserParams
    ): Promise<UserCurrent | AxiosError> => {
      let success = false;
      try {
        const userData = await UserRepository.findByEmailAndPassword(body);
        const token = userData?.user?.token;
        if (token && redirect && cookies) {
          await cookies().set("access_token", token);
        }
        return userData;
      } catch (e) {
        const error = e as AxiosError;
        return error;
      } finally {
        if (success && redirect) {
          redirect("/users");
        }
      }
    },

    register: async (
      body: UserRegisterUserParams
    ): Promise<UserCurrent | AxiosError> => {
      let success = false;
      try {
        const userData = await UserRepository.create(body);
        if (cookies && userData?.user?.token) {
          await cookies().set("access_token", userData.user.token);
          success = true;
        }
        return userData;
      } catch (e) {
        const error = e as AxiosError;
        return error;
      } finally {
        if (success && redirect) {
          redirect("/users");
        }
      }
    },
    update: async (
      body: UserUpdateUserParams
    ): Promise<UserUpdate | AxiosError> => {
      try {
        const userData = await UserRepository.update(body);
        return userData;
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    },
  };
}

export default UserService;
