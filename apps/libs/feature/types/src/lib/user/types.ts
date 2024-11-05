import { IBaseResponse, ILoginRequest, ILoginResponse } from '@interfaces';

export type User = {
  id: number;
  username: string;
  password?: string;
  // The salt used to generate the password hash
  salt?: string;
  access_token?: string;
};

export type BaseResponse = IBaseResponse;
export type LoginRequest = ILoginRequest;
export type LoginResponse = ILoginResponse;
