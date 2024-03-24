import type { ResponseObject } from '@/boilerplate/_modulesTypes';
import {
  User,
  UserCreate,
  UserCreateParams,
  UserLoginParams,
  UserUpdate,
  UserUpdateParams,
} from '../models/User';

export interface IUserRepository {
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  findByToken(): Promise<ResponseObject<User>>;
  findByEmailAndPassword(body: UserLoginParams): Promise<ResponseObject<User>>;
  create(body: UserCreateParams): Promise<ResponseObject<UserCreate>>;
  delete(id: string): Promise<ResponseObject<null>>;
}
