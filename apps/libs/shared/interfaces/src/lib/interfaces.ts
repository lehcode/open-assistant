export interface IBaseResponse {
  success: boolean;
  error?: string;
}

export interface ILoginResponse extends IBaseResponse {
  username?: string;
  access_token?: string | undefined;
}

export interface ILoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}
