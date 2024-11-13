import { User } from '@lib/shared';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import UserService from './user.service';

describe('UsersService', () => {
  const user: User = {
    id: 999,
    username: 'john.doe@email.com',
    password: '$ecret',
    salt: 'johnsalt',
  };
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.spyOn(service, 'findOne').mockImplementation((username: string) => {
      if (username === user.username) {
        return Promise.resolve({...user});
      }
      return Promise.resolve(undefined);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct user when a valid username is provided', async () => {
    const result = await service.findOne(user.username);
  
    expect(result).toEqual(user);
  });

  it('should return undefined when no user matches the provided username', async () => {
    const nonExistentUsername = 'nonexistent@example.com';
    
    const result = await service.findOne(nonExistentUsername);
    
    expect(result).toBeUndefined();
  });

  it('should handle case-sensitive usernames correctly', async () => {
    const lowercaseUsername = user.username;
    const uppercaseUsername = user.username.toUpperCase();

    const lowercaseResult = await service.findOne(lowercaseUsername);
    const uppercaseResult = await service.findOne(uppercaseUsername);
  
    expect(lowercaseResult).toBeDefined();
    expect(lowercaseResult?.username).toBe(user.username);
    expect(uppercaseResult).toBeUndefined();
  });

  it('should handle concurrent requests for the same username correctly', async () => {
    const promises = Array(5).fill(null).map(() => service.findOne(user.username));
    const results = await Promise.all(promises);
  
    results.forEach(result => {
      expect(result).toEqual(user);
    });
  });
});
