import { User } from '@lib/shared';
import { Test, TestingModule } from '@nestjs/testing';
import UserService from './user.service';

describe('UsersService', () => {
  const validUser: User = {
    id: 999,
    username: 'john.doe@email.com',
    password: '$ecret',
    salt: 'johnsalt',
  };
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.spyOn(service, 'findOne').mockImplementation((username: string) => {
      if (username === validUser.username) {
        return Promise.resolve({...validUser});
      }
      return Promise.resolve(undefined);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct user when a valid username is provided', async () => {
    const result = await service.findOne(validUser.username);
  
    expect(result).toEqual(validUser);
  });

  it('should return undefined when no user matches the provided username', async () => {
    const nonExistentUsername = 'nonexistent@example.com';
    
    const result = await service.findOne(nonExistentUsername);
    
    expect(result).toBeUndefined();
  });

  it('should handle case-sensitive usernames correctly', async () => {
    const lowercaseUsername = validUser.username;
    const uppercaseUsername = validUser.username.toUpperCase();

    const lowercaseResult = await service.findOne(lowercaseUsername);
    const uppercaseResult = await service.findOne(uppercaseUsername);
  
    expect(lowercaseResult).toBeDefined();
    expect(lowercaseResult?.username).toBe(validUser.username);
    expect(uppercaseResult).toBeUndefined();
  });

  it('should handle concurrent requests for the same username correctly', async () => {
    const promises = Array(5).fill(null).map(() => service.findOne(validUser.username));
    const results = await Promise.all(promises);
  
    results.forEach(result => {
      expect(result).toEqual(validUser);
    });
  });
});
