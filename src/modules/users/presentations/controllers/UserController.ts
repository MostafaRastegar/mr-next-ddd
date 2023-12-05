import type { IUserService } from "@/modules/users/applications/services/IUserService";
import type { User } from "@/modules/users/domains/models/User";

function UserController(UserService: IUserService) {
  return {
    async createUser(user: User) {
      const userData = await UserService.createUser(user);
      return userData;
    },
    async getUserById(id: number) {
      const userData = await UserService.getUserById(id);
      return userData;
    },

    async getAllUser() {
      const usersList = await UserService.getAllUser();
      return usersList;
    },
  };
}

export default UserController;
