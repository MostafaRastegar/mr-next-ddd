import { ResponseObject } from '@/modules/_modulesTypes';
import type {
  UserCurrent,
  UserLogin,
  UserLoginUserParams,
  UserRegisterUserParams,
  UserUpdate,
  UserUpdateUserParams,
} from '@/modules/users/domains/models/User';

export interface IUserService {
  register(body: UserRegisterUserParams): Promise<ResponseObject<UserCurrent>>;
  login(body: UserLoginUserParams): Promise<ResponseObject<UserLogin>>;
  update(body: UserUpdateUserParams): Promise<ResponseObject<UserUpdate>>;
  getUser(): Promise<ResponseObject<UserCurrent>>;
}
