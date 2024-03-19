import endpoints from '@/constants/endpoints';
import { serviceHandler } from '@/helpers/serviceHandler';
import type {
  UserCurrent,
  UserLogin,
  UserLoginUserParams,
  UserRegister,
  UserRegisterUserParams,
  UserUpdate,
  UserUpdateUserParams,
} from '@/modules/users/domains/models/User';
import type { IUserRepository } from '@/modules/users/domains/repositories/IUserRepository';
import request, { requestWithoutAuth } from '@/utils/request';

function UserRepository(): IUserRepository {
  return {
    findByToken: () =>
      serviceHandler<UserCurrent>(() =>
        request.get(endpoints.USERS.GET_USER()),
      ),

    findByEmailAndPassword: (body: UserLoginUserParams) =>
      serviceHandler<UserLogin>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS_LOGIN(), body),
      ),

    update: (body: UserUpdateUserParams) =>
      serviceHandler<UserUpdate>(() =>
        request.put(endpoints.USERS.PUT_USER(), body),
      ),

    create: (body: UserRegisterUserParams) =>
      serviceHandler<UserRegister>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS(), body),
      ),
  };
}

export default UserRepository;
