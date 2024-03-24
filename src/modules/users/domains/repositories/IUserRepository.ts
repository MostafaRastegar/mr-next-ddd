import { ResponseObject } from '@/modules/_modulesTypes';
import {
  UserCurrent,
  UserRegister,
  UserRegisterParams,
  UserUpdate,
  UserUpdateParams,
} from '../models/User';

export interface IUserRepository {
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  findByToken(): Promise<ResponseObject<UserCurrent>>;
  create(body: UserRegisterParams): Promise<ResponseObject<UserRegister>>;
}
