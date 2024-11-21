import { IUser } from "apps/libs/shared/src/lib/interfaces/user.interfaces";
import { ApiResponse } from "./base.types";

export type User = IUser

export type SafeUser = Omit<User, 'password' | 'salt'>

type AuthCredentials = Pick<User, 'id' | 'username' | 'access_token'>

export type UserLoginResponse = ApiResponse<AuthCredentials>
