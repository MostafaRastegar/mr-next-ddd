import { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
import { IUserService } from "./IUserService";
import Cookie from "js-cookie";
import type {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
} from "@/modules/users/domains/models/User";

function UserService(UserRepository: IUserRepository): IUserService {
  return {
    login: async (body: UserLogin): Promise<UserCurrent | null> => {
      const userData = await UserRepository.findByEmailAndPassword(body);
      return userData;
    },
    getUser: async (): Promise<UserCurrent | null> => {
      const token = Cookie.get("access_token");
      if (token) {
        const userData = await UserRepository.findByToken(token);
        return userData;
      }
      return null;
    },
    register: async (body: UserRegister): Promise<UserCurrent | null> => {
      const userData = await UserRepository.create(body);
      return userData;
    },
    update: async (body: UserUpdate): Promise<UserCurrent | null> => {
      const userData = await UserRepository.update(body);
      return userData;
    },
  };
}

export default UserService;
