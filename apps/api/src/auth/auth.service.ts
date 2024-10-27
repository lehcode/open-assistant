import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'api/src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async signIn(
    username: string,
    pw: string
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pw) {
      throw new UnauthorizedException ('Invalid credentials');
    }
    
    
    const payload = { sub: user.id, username: user.username };
        
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
