import { useQuery } from "@tanstack/react-query";
import UserController from "../controllers/UserController";
import UserService from "@/modules/users/applications/services/UserService";
import { UserRepository } from "@/modules/users/infrastructure";

import { User } from "@/modules/users/domains/models/User";
import cookies from "js-cookie";
const userService = UserService(UserRepository, () => cookies);
const userController = UserController(userService);

function UserUseCase() {
  return {
    useGetCurrentUser: () =>
      useQuery<User | null>({
        queryKey: ["user"],
        queryFn: userController.getCurrentUser,
      }),
  };
}

export default UserUseCase;
