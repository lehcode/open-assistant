import { ApiResponse } from "./base.types";

export type User = {
  id: number;
  username: string;
  password: string;
  // The salt used to generate the password hash
  salt: string;
  access_token?: string;
};


type AuthCredentials = Pick<User, 'id' | 'username' | 'access_token'>


export type UserLoginResponse = ApiResponse<AuthCredentials>
