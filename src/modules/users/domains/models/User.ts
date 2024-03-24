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

export interface UserRegisterParams {
  password: string;
  email: string;
}

export interface UserUpdateParams {
  email: string;
}

export interface UserRegister extends UserCurrent {}
export interface UserUpdate extends UserCurrent {}
