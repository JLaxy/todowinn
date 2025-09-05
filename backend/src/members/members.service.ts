import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMemberDTO } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllMembers() {
    return await this.databaseService.members.findMany();
  }

  createMember(createMemberDTO: CreateMemberDTO) {
    // await this.databaseService.members.create({
    //   data: {
    //     email: createMemberDTO.email,
    //     password: await this.passwordService.hash(createMemberDTO.password),
    //   },
    // });

    return createMemberDTO;
  }
}
