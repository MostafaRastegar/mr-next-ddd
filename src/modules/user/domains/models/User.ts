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

export interface UserCreateParams {
  password: string;
  email: string;
}

export interface UserLoginParams {
  user: {
    password: string;
    email: string;
  };
}

export interface UserUpdateParams {
  email: string;
}

export interface UserCreate extends UserCurrent {}
export interface UserUpdate extends UserCurrent {}
