import { useQuery, useMutation } from "@tanstack/react-query";
import UserController from "../controllers/UserController";
import UserService from "@/modules/users/applications/services/UserService";
import { UserRepository } from "@/modules/users/infrastructure";

import { User, UserRegisterParams } from "@/modules/users/domains/models/User";
const userService = UserService(UserRepository);
const userController = UserController(userService);

function UserUseCase() {
  return {
    useGetCurrentUser: () =>
      useQuery<User | null>({
        queryKey: ["user"],
        queryFn: userController.getCurrentUser,
      }),
    useUserRegister: () =>
      useMutation({
        mutationFn: (formData: FormData) => {
          const rawFormData: UserRegisterParams = {
            email: formData.get("email") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
          };
          return userController.userRegister(rawFormData);
        },
      }),
  };
}

export default UserUseCase;
