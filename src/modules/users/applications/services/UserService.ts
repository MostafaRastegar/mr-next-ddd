import { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
import { IUserService } from "./IUserService";
import JsCookies from "js-cookie";
import type {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
  UserLoginUserParams,
  UserRegisterUserParams,
  UserUpdateUserParams,
} from "@/modules/users/domains/models/User";

const cookiesClient = () => JsCookies;
function UserService(
  UserRepository: IUserRepository,
  cookies: Function = cookiesClient,
  redirect?: Function
): IUserService {
  return {
    getUser: async (): Promise<UserCurrent | null> => {
      const token = (await cookies().get("access_token")) as string;
      if (token) {
        const userData = await UserRepository.findByToken(token);
        return userData;
      }
      return null;
    },
    login: async (body: UserLoginUserParams): Promise<void> => {
      let success = false;
      try {
        const userData = await UserRepository.findByEmailAndPassword(body);
        if (cookies) {
          await cookies().set("access_token", userData.user.token);
        }

        if (userData.user.token) {
          success = true;
        }
      } finally {
        if (success && redirect) {
          redirect("users");
        }
      }
    },
    register: async (body: UserRegisterUserParams): Promise<void> => {
      let success = false;
      try {
        const userData = await UserRepository.create(body);
        if (cookies) {
          await cookies().set("access_token", userData.user.token);
        }

        if (userData.user.token) {
          success = true;
        }
      } finally {
        if (success && redirect) {
          redirect("users");
        }
      }
    },
    update: async (body: UserUpdateUserParams): Promise<UserUpdate | null> => {
      const userData = await UserRepository.update(body);
      return userData;
    },
  };
}

export default UserService;
