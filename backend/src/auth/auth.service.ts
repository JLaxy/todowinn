import { Injectable } from '@nestjs/common';
import { LoginMemberDTO } from './dto/login-member.dto';
import { DatabaseService } from 'src/database/database.service';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashingService: HashingService,
  ) {}

  async login(loginMemberDTO: LoginMemberDTO) {
    // Check if email exists; will automatically throw error if does not exist
    const member = await this.databaseService.members.findUniqueOrThrow({
      where: {
        email: loginMemberDTO.email,
      },
    });

    return this.hashingService.verify(loginMemberDTO.password, member.password);
  }
}
