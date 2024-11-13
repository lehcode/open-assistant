
export interface ILoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface IAuthCredentials {
  userId: number;
  userName: string;
  accessToken: string;
  refreshToken: string;
}
