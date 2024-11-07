import { Injectable } from '@nestjs/common';
import { User } from '@open-assistant/types';

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

@Injectable()
class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'lehcode@gmail.com',
      password: 'b*4dYA$zAvvnN#a%',
      salt: 'random',
    },
    {
      id: 2,
      username: 'john',
      password: '$ecret',
      salt: 'random',
    },
    {
      id: 3,
      username: 'jane',
      password: 'guess',
      salt: 'random',
    },
  ];

  /**
   * Finds a user by their username.
   *
   * This function searches through the list of users and returns the user object
   * if a user with the specified username is found. If no user is found, it
   * returns undefined.
   *
   * @param {string} username - The username of the user to find.
   * @returns {Promise<User | undefined>} - A promise that resolves to the user object or undefined.
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

export default UserService;
