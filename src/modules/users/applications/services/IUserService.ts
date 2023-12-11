import type {
  UserUpdate,
  UserCurrent,
  UserRegisterUserParams,
  UserLoginUserParams,
  UserUpdateUserParams,
} from "@/modules/users/domains/models/User";
import { AxiosError } from "axios";

export interface IUserService {
  register(body: UserRegisterUserParams): Promise<UserCurrent | AxiosError>;
  login(body: UserLoginUserParams): Promise<UserCurrent | AxiosError>;
  update(body: UserUpdateUserParams): Promise<UserUpdate | AxiosError>;
  getUser(): Promise<UserCurrent | AxiosError>;
}
