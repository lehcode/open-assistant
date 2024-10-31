
import { Injectable } from '@nestjs/common';
import { User } from '@app-types';

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

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
      salt: 'random',
    },
    {
      id: 3,
      username: 'jane',
      password: 'guess',
      salt: 'random',
    },
  ];

  
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
