import { useQuery } from "@tanstack/react-query";
import UserController from "../controllers/UserController";
import UserService from "@/modules/users/applications/services/UserService";
import { UserRepository } from "@/modules/users/infrastructure";
import { User } from "@/modules/users/domains/models/User";

const userService = UserService(UserRepository);
const userController = UserController(userService);

function UserUseCase() {
  return {
    useGetAllUser: () =>
      useQuery<User[] | unknown>({
        queryKey: ["users"],
        queryFn: userController.getAllUser,
      }),
  };
}

export default UserUseCase;
