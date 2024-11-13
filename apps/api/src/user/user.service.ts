import { User } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
class UserService {
  private users: User[] = [];
  private readonly bcryptConfig: Record<string, any> = {};

  constructor(private readonly configService: ConfigService) {
    this.initializeUsers();
    this.bcryptConfig = this.configService.get('bcrypt') || {};
  }

  private async initializeUsers() {
    const bcrypt = await this.hashPassword('$ecret');

    this.users = [
      {
        id: 999,
        username: 'lehcode@gmail.com',
        password: bcrypt.hashedPassword,
        salt: bcrypt.salt,
      },
    ];
  }

  /**
   * Retrieves a user by the given username.
   *
   * This function will return the User object associated with the given username
   * if it exists. Otherwise, the function will return undefined.
   *
   * @param {string} username - The username to search.
   * @returns {Promise<User | undefined>} - The User instance or undefined if the user does not exist.
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => {
      return user.username.toLowerCase() === username.toLowerCase();
    });
  }

  async createUser(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(this.bcryptConfig.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: User = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
      salt,
    };

    this.users.push(newUser);
    return newUser;
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }

  private async hashPassword(password: string): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await bcrypt.genSalt(this.bcryptConfig.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
  }
}

export default UserService;
