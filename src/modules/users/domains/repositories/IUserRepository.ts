import {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
  UserLoginUserParams,
  UserRegisterUserParams,
  UserUpdateUserParams,
} from "../models/User";

export interface IUserRepository {
  update(body: UserUpdateUserParams): Promise<UserUpdate>;
  findByToken(token?: string): Promise<UserCurrent>;
  findByEmailAndPassword(body: UserLoginUserParams): Promise<UserLogin>;
  create(body: UserRegisterUserParams): Promise<UserRegister>;
}
