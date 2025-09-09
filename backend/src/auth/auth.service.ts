import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginMemberDTO } from './dto/login-member.dto';
import { DatabaseService } from 'src/database/database.service';
import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginMemberDTO: LoginMemberDTO, res: Response) {
    // Check if email exists; will automatically throw error if does not exist
    const member = await this.databaseService.members.findUnique({
      where: {
        email: loginMemberDTO.email,
      },
    });

    if (!member) return this.throwError();

    // If matches, generate JWT
    if (
      await this.hashingService.verify(loginMemberDTO.password, member.password)
    ) {
      // Generate JWT
      const token = await this.jwtService.signAsync({
        sub: member.member_id,
        email: member.email,
      });

      Logger.log(`token: ${token}`);

      res.cookie('token', token, {
        httpOnly: true,
        // Change to true on production with HTTPS
        secure: false,
        sameSite: 'strict',
        path: '/', // cookie valid for entire site
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });

      return { message: 'Login successful!' };
    }

    return this.throwError();
  }

  logout(res: Response) {
    res.clearCookie('token', { path: '/' });
    return { message: 'Logged out successfully' };
  }

  private throwError() {
    throw new UnauthorizedException('Invalid credentials!');
  }
}
