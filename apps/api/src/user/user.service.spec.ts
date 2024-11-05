import { Test, TestingModule } from '@nestjs/testing';
import UserService from './user.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct user when a valid username is provided', async () => {
    const validUsername = 'lehcode@gmail.com';
    const expectedUser = {
      id: 1,
      username: 'lehcode@gmail.com',
      password: 'b*4dYA$zAvvnN#a%',
      salt: 'random',
    };
  
    const result = await service.findOne(validUsername);
  
    expect(result).toEqual(expectedUser);
  });

  it('should return undefined when no user matches the provided username', async () => {
    const nonExistentUsername = 'nonexistent@example.com';
    
    const result = await service.findOne(nonExistentUsername);
    
    expect(result).toBeUndefined();
  });

  it('should handle case-sensitive usernames correctly', async () => {
    const lowercaseUsername = 'john';
    const uppercaseUsername = 'JOHN';
  
    const lowercaseResult = await service.findOne(lowercaseUsername);
    const uppercaseResult = await service.findOne(uppercaseUsername);
  
    expect(lowercaseResult).toBeDefined();
    expect(lowercaseResult?.username).toBe('john');
    expect(uppercaseResult).toBeUndefined();
  });

  it('should handle concurrent requests for the same username correctly', async () => {
    const username = 'lehcode@gmail.com';
    const expectedUser = {
      id: 1,
      username: 'lehcode@gmail.com',
      password: 'b*4dYA$zAvvnN#a%',
      salt: 'random',
    };
  
    const promises = Array(5).fill(null).map(() => service.findOne(username));
    const results = await Promise.all(promises);
  
    results.forEach(result => {
      expect(result).toEqual(expectedUser);
    });
  });

  // it.skip('should return undefined when the users array is empty', async () => {
  //   // Temporarily replace the users array with an empty array
  //   const originalUsers = service['users'];
  //   service['users'] = [];
  
  //   const result = await service.findOne('anyUsername');
  
  //   expect(result).toBeUndefined();
  
  //   // Restore the original users array
  //   service['users'] = originalUsers;
  // });
});
