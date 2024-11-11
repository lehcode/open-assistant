import { HttpStatus } from "@nestjs/common";

export interface IApiBaseResponse {
  success: boolean;
  statusCode: HttpStatus;
}

export interface IApiSuccessResponse extends IApiBaseResponse {
  data: object;
}
