export interface Users {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface UsersParams {}
export interface UsersCreateParams {
  name: string;
  username: string;
  email: string;
}
export interface UsersUpdateParams {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface UserLoginParams {
  user: {
    password: string;
    email: string;
  };
}
