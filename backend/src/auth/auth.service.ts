import { Injectable } from '@nestjs/common';
import { LoginMemberDTO } from './dto/login-member.dto';
import { DatabaseService } from 'src/database/database.service';
import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginMemberDTO: LoginMemberDTO) {
    // Check if email exists; will automatically throw error if does not exist
    const member = await this.databaseService.members.findUniqueOrThrow({
      where: {
        email: loginMemberDTO.email,
      },
    });

    // If matches, return JWT
    if (
      await this.hashingService.verify(loginMemberDTO.password, member.password)
    )
      // Generate and return JWT
      return {
        access_token: await this.jwtService.signAsync({
          sub: member.member_id,
          email: member.email,
        }),
      };

    return null;
  }
}
