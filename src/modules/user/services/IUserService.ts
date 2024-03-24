import type { ResponseObject } from '@/boilerplate/_modulesTypes';
import type {
  UserCreate,
  UserCreateParams,
  UserCurrent,
  UserLoginParams,
  UserUpdate,
  UserUpdateParams,
} from '../domains/models/User';

export interface IUserService {
  login(body: UserLoginParams): Promise<ResponseObject<UserCurrent>>;
  register(body: UserCreateParams): Promise<ResponseObject<UserCreate>>;
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  getCurrentUser(): Promise<ResponseObject<UserCurrent>>;
  remove(id: string): Promise<ResponseObject<null>>;
}
