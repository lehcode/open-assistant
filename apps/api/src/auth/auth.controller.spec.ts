import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginResponse, User } from '@lib/shared';
import AuthService from './auth.service';
import { Request } from 'express';
import UserService from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a login response with a valid token and username when the user exists and credentials are correct', async () => {
    const user: User = {
      id: 999,
      username: 'testUser',
      password: 'testPassword',
    };
    const expectedResponse: LoginResponse = {
      success: true,
      access_token: 'validToken',
      username: 'testUser',
    };

    jest.spyOn(AuthService.prototype, 'login').mockResolvedValue(expectedResponse);

    const result = await controller.login({ body: user } as Request);

    expect(result).toEqual(expectedResponse);
    expect(AuthService.prototype.login).toHaveBeenCalledWith(user);
  });

  it('should return an error response when the user does not exist', async () => {
    const user: User = {
      id: 999,
      username: 'nonexistentUser',
      password: 'testPassword',
    };
    const expectedResponse: LoginResponse = {
      success: false,
      error: 'Invalid username or password',
    };
  
    jest.spyOn(AuthService.prototype, 'login').mockResolvedValue(expectedResponse);
  
    const result = await controller.login({ body: user } as Request);
  
    expect(result).toEqual(expectedResponse);
    expect(AuthService.prototype.login).toHaveBeenCalledWith(user);
  });

  it('should handle case when req.body is not a valid User object', async () => {
    const invalidUser = {
      invalidField: 'someValue',
    };
    const expectedResponse: LoginResponse = {
      success: false,
      error: 'Invalid user object',
    };
  
    jest.spyOn(AuthService.prototype, 'login').mockResolvedValue(expectedResponse);
  
    const result = await controller.login({ body: invalidUser } as unknown as Request);
  
    expect(result).toEqual(expectedResponse);
    expect(AuthService.prototype.login).toHaveBeenCalledWith(invalidUser);
  });

  it('should handle case when AuthService.login() throws an error', async () => {
    const user: User = {
      id: 999,
      username: 'testUser',
      password: 'testPassword',
    };
    const expectedError = new Error('Login failed');
  
    jest.spyOn(AuthService.prototype, 'login').mockRejectedValue(expectedError);
  
    await expect(controller.login({ body: user } as Request)).rejects.toThrow(expectedError);
  
    expect(AuthService.prototype.login).toHaveBeenCalledWith(user);
  });
});
