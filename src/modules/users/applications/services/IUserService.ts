import type {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
} from "@/modules/users/domains/models/User";

export interface IUserService {
  register(body: UserRegister): Promise<UserCurrent | null>;
  login(body: UserLogin): Promise<UserCurrent | null>;
  update(body: UserUpdate): Promise<UserUpdate | null>;
  getUser(): Promise<UserCurrent | null>;
}
