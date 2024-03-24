import { ResponseObject } from '@/modules/_modulesTypes';
import type {
  User,
  UserCreate,
  UserCreateParams,
  UserLoginParams,
  UserUpdate,
  UserUpdateParams,
} from '../domains/models/User';

export interface IUserService {
  login(body: UserLoginParams): Promise<ResponseObject<User>>;
  register(body: UserCreateParams): Promise<ResponseObject<UserCreate>>;
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  getCurrentUser(): Promise<ResponseObject<User>>;
  remove(id: string): Promise<ResponseObject<null>>;
}
