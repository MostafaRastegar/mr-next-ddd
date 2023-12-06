export interface User {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  token: string;
}

export interface UserCurrent {
  user: User;
}
export interface UserLoginParams {
  password: string;
  email: string;
}
export interface UserLogin {
  user: UserLoginParams;
}

export interface UserRegisterParams {
  password: string;
  username: string;
  email: string;
}
export interface UserRegister {
  user: UserRegisterParams;
}

export interface UserUpdateParams {
  email: string;
}
export interface UserUpdate {
  user: UserUpdateParams;
}
