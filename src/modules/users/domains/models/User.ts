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

export interface UserRegisterParams {
  password: string;
  username: string;
  email: string;
}

export interface UserUpdateParams {
  email: string;
}

export interface UserLogin extends UserCurrent {}
export interface UserRegister extends UserCurrent {}
export interface UserUpdate extends UserCurrent {}

export interface UserLoginUserParams {
  user: UserLoginParams;
}
export interface UserRegisterUserParams {
  user: UserRegisterParams;
}
export interface UserUpdateUserParams {
  user: UserUpdateParams;
}
