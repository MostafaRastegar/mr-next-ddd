import { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
import { IUserService } from "./IUserService";

function UserService(UserRepository: IUserRepository): IUserService {
  return {
    async createUser(user) {
      const userData = await UserRepository.create(user);
      return userData;
    },
    async getUserById(id: number) {
      const userData = await UserRepository.find(id);
      return userData;
    },

    async getAllUser() {
      const usersList = await UserRepository.all();
      return usersList;
    },
  };
}

export default UserService;
