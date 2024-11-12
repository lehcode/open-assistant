import { IApiBaseResponse } from "./base.interfaces";

export interface IApiErrorResponse extends IApiBaseResponse {
  error: string;
  data?: any
}
