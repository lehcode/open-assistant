import { IApiBaseResponse } from "../interfaces/base.interfaces";


export type ApiResponse<T> = Required<IApiBaseResponse> & { data: T }
export type ApiSuccessResponse = ApiResponse<IApiBaseResponse & { data: any }>
