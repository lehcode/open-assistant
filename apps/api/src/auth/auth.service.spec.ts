import { Test, TestingModule } from '@nestjs/testing';
import AuthService from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import UserService from '../user/user.service';
import { User } from '@lib/shared';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  const userMock: User = {
    id: 999,
    username: 'testUser',
    password: 'testPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [UserModule, AuthModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return null when the username does not exist', async () => {
    const userMock: User = {
      username: 'nonexistingUser@gmail.com',
      password: 'testPassword',
      id: 0
    };

    jest.spyOn(userService, 'findOne').mockResolvedValue(userMock);

    const result = await authService.validateUser(
      'nonexistentUser',
      'password'
    );

    expect(result).toBeNull();
  });

  it('should return null when the password is incorrect', async () => {
    const userMock: User = {
      id: 999,
      username: 'testUser',
      password: 'testPassword',
    };

    jest.spyOn(userService, 'findOne').mockResolvedValue(userMock);

    const result = await authService.validateUser('testUser', 'wrongPassword');

    expect(result).toBeNull();
  });

  it('should return user object when the username and password are correct', async () => {
    const username = 'testUser';
    const password = 'testPassword';

    jest.spyOn(userService, 'findOne').mockResolvedValue(userMock as User);

    const result = await authService.validateUser(username, password);

    expect(result).toEqual({ id: userMock.id, username: userMock.username });
  });
});
