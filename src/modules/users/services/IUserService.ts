import { ResponseObject } from '@/modules/_modulesTypes';
import type {
  UserCurrent,
  UserLogin,
  UserLoginParams,
  UserRegisterParams,
  UserUpdate,
  UserUpdateParams,
} from '@/modules/users/domains/models/User';

export interface IUserService {
  register(body: UserRegisterParams): Promise<ResponseObject<UserCurrent>>;
  login(body: UserLoginParams): Promise<ResponseObject<UserLogin>>;
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  getUser(): Promise<ResponseObject<UserCurrent>>;
}
