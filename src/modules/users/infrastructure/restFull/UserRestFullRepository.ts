import endpoints from "@/constants/endpoints";
import type {
  UserLogin,
  UserLoginUserParams,
  UserRegisterUserParams,
  UserUpdateUserParams,
  UserRegister,
  UserUpdate,
  UserCurrent,
} from "@/modules/users/domains/models/User";
import type { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
import request, { requestWithoutAuth } from "@/lib/request";
function UserRepository(): IUserRepository {
  return {
    findByToken: async (): Promise<UserCurrent> => {
      const response = await request.get(endpoints.USERS.GET_USER());
      return response.data;
    },
    findByEmailAndPassword: async (
      body: UserLoginUserParams
    ): Promise<UserLogin> => {
      const response = await requestWithoutAuth.post(
        endpoints.USERS.POST_USERS_LOGIN(),
        body
      );
      return response.data;
    },

    update: async (body: UserUpdateUserParams): Promise<UserUpdate> => {
      const response = await request.put(endpoints.USERS.PUT_USER(), body);
      return response.data;
    },

    create: async (body: UserRegisterUserParams): Promise<UserRegister> => {
      const response = await requestWithoutAuth.post(
        endpoints.USERS.POST_USERS(),
        body
      );

      return response.data;
    },
  };
}

export default UserRepository;
