import endpoints from '@/constants/endpoints';
import { serviceHandler } from '@/helpers/serviceHandler';
import type {
  UserCurrent,
  UserLogin,
  UserLoginParams,
  UserRegister,
  UserRegisterParams,
  UserUpdate,
  UserUpdateParams,
} from '@/modules/users/domains/models/User';
import type { IUserRepository } from '@/modules/users/domains/repositories/IUserRepository';
import request, { requestWithoutAuth } from '@/utils/request';

function UserRepository(): IUserRepository {
  return {
    findByToken: () =>
      serviceHandler<UserCurrent>(() =>
        request.get(endpoints.USERS.GET_USER()),
      ),

    findByEmailAndPassword: (body: UserLoginParams) =>
      serviceHandler<UserLogin>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS_LOGIN(), body),
      ),

    update: (body: UserUpdateParams) =>
      serviceHandler<UserUpdate>(() =>
        request.put(endpoints.USERS.PUT_USER(), body),
      ),

    create: (body: UserRegisterParams) =>
      serviceHandler<UserRegister>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS(), body),
      ),
  };
}

export default UserRepository;
