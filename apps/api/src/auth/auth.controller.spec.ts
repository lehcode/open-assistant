import { IAuthCredentials, User } from '@libs/shared';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import UserService from '../user/user.service';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
        UserService,
        JwtService,
        ConfigService
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a login response with a valid token and username when the user exists and credentials are correct', async () => {
    const user: User = {
      id: 999,
      username: 'testUser',
      password: 'testPassword',
      salt: 'testSalt'
    };
    const authCredentials: IAuthCredentials = {
      userId: 999,
      userName: 'testUser',
      accessToken: 'validToken',
      refreshToken: 'validRefreshToken'
    };
    const expectedResponse = {
      success: true,
      statusCode: HttpStatus.OK,
      data: authCredentials
    };
  
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    jest.spyOn(authService, 'login').mockResolvedValue(authCredentials);
  
    const result = await controller.login({ body: user } as Request);
  
    expect(result).toEqual(expectedResponse);
    expect(authService.login).toHaveBeenCalledWith(user);
  });

  it('should throw an HttpException when the user does not exist', async () => {
    const user: User = {
      id: 999,
      username: 'nonexistentUser',
      password: 'testPassword',
      salt: 'testSalt'
    };
    
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(controller.login({ body: user } as Request)).rejects.toThrow(
      new HttpException('Invalid username or password', HttpStatus.FORBIDDEN)
    );
  });

  it('should handle case when req.body is not a valid User object', async () => {
    const invalidUser = {
      invalidField: 'someValue',
    };
    
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(controller.login({ body: invalidUser } as unknown as Request)).rejects.toThrow(
      new HttpException('Invalid username or password', HttpStatus.FORBIDDEN)
    );
  });

  it('should handle case when AuthService.login() throws an error', async () => {
    const user: User = {
      id: 999,
      username: 'testUser',
      password: 'testPassword',
      salt: 'testSalt'
    };
    const expectedError = new Error('Invalid username or password');
  
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    jest.spyOn(authService, 'login').mockRejectedValue(expectedError);
  
    await expect(controller.login({ body: user } as Request)).rejects.toThrow(expectedError);
  
    expect(authService.login).toHaveBeenCalledWith(user);
  });
});
