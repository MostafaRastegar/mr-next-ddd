import UserController from "../controllers/UserController";
import UserService from "@/modules/users/applications/services/UserService";
import { UserRepository } from "@/modules/users/infrastructure";
import {
  UserLoginParams,
  UserRegisterParams,
} from "@/modules/users/domains/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const userService = UserService(UserRepository, redirect, cookies);
const userController = UserController(userService);

function UserNextSSR() {
  return {
    userLogin: async (formData: FormData) => {
      const rawFormData: UserLoginParams = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const result = await userController.userLogin(rawFormData);
      return result;
    },
    userRegister: async (formData: FormData) => {
      const rawFormData: UserRegisterParams = {
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      };
      const result = await userController.userRegister(rawFormData);

      return result;
    },
  };
}

export default UserNextSSR;
