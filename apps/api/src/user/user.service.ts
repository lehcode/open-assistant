import { User } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import environment from '../environments/environment';


@Injectable()
class UserService {
  private users: User[] = [];

  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers() {
    const bcrypt1 = await this.hashPassword('$ecret');
    const bcrypt2 = await this.hashPassword('secret');
    const bcrypt3 = await this.hashPassword('guess');

    this.users = [
      {
        id: 999,
        username: 'lehcode@gmail.com',
        password: bcrypt1.hashedPassword,
        salt: bcrypt1.salt,
      },
      {
        id: 998,
        username: 'admin',
        password: bcrypt2.hashedPassword,
        salt: bcrypt2.salt,
      },
      {
        id: 997,
        username: 'jane',
        password: bcrypt3.hashedPassword,
        salt: bcrypt3.salt,
      },
    ];
  }

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
    return this.users.find((user) => {
      return user.username.toLowerCase() === username.toLowerCase()
    });
  }

  async createUser(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(environment.bcrypt.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser: User = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
      salt
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }

  private async hashPassword(password: string): Promise<{ hashedPassword: string, salt: string }> {
    const salt = await bcrypt.genSalt(environment.bcrypt.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
  }
}

export default UserService;
