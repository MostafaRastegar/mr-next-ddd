import {
  PaginationList,
  PaginationParams,
  ResponseObject,
} from 'papak/_modulesTypes';
import {
  UserLoginParams,
  Users,
  UsersCreateParams,
  UsersParams,
  UsersUpdateParams,
} from './models/Users';

export interface IUsersService {
  getAll(
    params: UsersParams & PaginationParams,
  ): Promise<ResponseObject<PaginationList<Users>>>;
  get(id: string): Promise<ResponseObject<Users>>;
  create(params: UsersCreateParams): Promise<ResponseObject<null>>;
  update(params: UsersUpdateParams): Promise<ResponseObject<null>>;
  remove(id: string): Promise<ResponseObject<null>>;
  login(body: UserLoginParams): Promise<ResponseObject<Users>>;
}
