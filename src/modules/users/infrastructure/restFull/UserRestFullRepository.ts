import axios from "axios";
import endpoints from "@/constants/endpoints";
import type {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
} from "@/modules/users/domains/models/User";
import type { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
function UserRepository(): IUserRepository {
  return {
    async findByToken(token?: string): Promise<UserCurrent> {
      const response = await axios.get(endpoints.USERS.GET_USER(), {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    },
    async findByEmailAndPassword(body: UserLogin): Promise<UserCurrent> {
      const response = await axios.post(endpoints.USERS.GET_USER(), body);
      return response.data;
    },

    async update(body: UserUpdate): Promise<UserCurrent> {
      const response = await axios.put(endpoints.USERS.PUT_USER(), body);
      return response.data;
    },

    async create(body: UserRegister): Promise<UserCurrent> {
      const response = await axios.post(endpoints.USERS.POST_USERS(), body);
      return response.data;
    },
  };
}

export default UserRepository;
