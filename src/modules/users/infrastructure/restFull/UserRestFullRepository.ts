import axios from "axios";
import endpoints from "@/constants/endpoints";
import type { User } from "@/modules/users/domains/models/User";
import type { IUserRepository } from "@/modules/users/domains/repositories/IUserRepository";
function UserRepository(): IUserRepository {
  return {
    async all(): Promise<User[]> {
      const response = await axios.get(endpoints.USER.GET_USERS());
      return response.data;
    },

    async find(id: number): Promise<User> {
      const response = await axios.get(endpoints.USER.GET_USERS_ID(id));
      return response.data;
    },

    async create(data: object): Promise<User> {
      const response = await axios.post("/api/users", data);
      return response.data;
    },
  };
}

export default UserRepository;
