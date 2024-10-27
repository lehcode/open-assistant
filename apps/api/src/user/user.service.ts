
import { Injectable } from '@nestjs/common';
import { User } from '@app-types';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: '$ecret',
      salt: 'random',
    },
    {
      id: 2,
      username: 'john',
      password: 'changeme',
      salt: 'salt',
    },
    {
      id: 3,
      username: 'maria',
      password: 'guess',
      salt: 'salt',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
