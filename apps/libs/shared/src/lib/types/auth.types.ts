import { IAuthCredentials, ILoginRequest } from '../interfaces/auth.interfaces';
import { IApiSuccessResponse } from '../interfaces/base.interfaces';
import { IApiErrorResponse } from '../interfaces/error.interfaces';


export type LoginRequest = Required<ILoginRequest>;

export type LoginResponse<T> = T extends { success: true }
? IApiSuccessResponse & { data: T }
: IApiErrorResponse;


export type AuthCredentials = IAuthCredentials;

