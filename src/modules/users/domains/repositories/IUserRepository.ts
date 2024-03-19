import { ResponseObject } from '@/modules/_modulesTypes';
import {
  UserCurrent,
  UserLogin,
  UserLoginUserParams,
  UserRegister,
  UserRegisterUserParams,
  UserUpdate,
  UserUpdateUserParams,
} from '../models/User';

export interface IUserRepository {
  update(body: UserUpdateUserParams): Promise<ResponseObject<UserUpdate>>;
  findByToken(): Promise<ResponseObject<UserCurrent>>;
  findByEmailAndPassword(
    body: UserLoginUserParams,
  ): Promise<ResponseObject<UserLogin>>;
  create(body: UserRegisterUserParams): Promise<ResponseObject<UserRegister>>;
}
