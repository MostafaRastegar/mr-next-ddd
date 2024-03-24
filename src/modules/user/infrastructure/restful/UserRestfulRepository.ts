import { serviceHandler } from '@/boilerplate/helpers/serviceHandler';
import request, { requestWithoutAuth } from '@/boilerplate/utils/request';
import endpoints from '@/constants/endpoints';
import type {
  User,
  UserCreate,
  UserCreateParams,
  UserLoginParams,
  UserUpdate,
  UserUpdateParams,
} from '../../domains/models/User';
import type { IUserRepository } from '../../domains/repositories/IUserRepository';

function UserRepository(): IUserRepository {
  return {
    findByToken: () =>
      serviceHandler<User>(() => request.get(endpoints.USERS.GET_USER())),

    findByEmailAndPassword: (body: UserLoginParams) =>
      serviceHandler<User>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS_LOGIN(), body),
      ),
    update: (body: UserUpdateParams) =>
      serviceHandler<UserUpdate>(() =>
        request.put(endpoints.USERS.PUT_USER(), body),
      ),

    create: (body: UserCreateParams) =>
      serviceHandler<UserCreate>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS(), body),
      ),
    delete: (id: string) =>
      serviceHandler<null>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS(), id),
      ),
  };
}

export default UserRepository;
