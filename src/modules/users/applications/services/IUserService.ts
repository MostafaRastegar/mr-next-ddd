import type {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
  UserRegisterUserParams,
  UserLoginUserParams,
  UserUpdateUserParams,
} from "@/modules/users/domains/models/User";

export interface IUserService {
  register(body: UserRegisterUserParams): Promise<void>;
  login(body: UserLoginUserParams): Promise<void>;
  update(body: UserUpdateUserParams): Promise<UserUpdate | null>;
  getUser(): Promise<UserCurrent | null>;
}
