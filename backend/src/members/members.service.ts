import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { HashingService } from 'src/hashing/hashing.service';
import { updateMemberDTO } from './dto/update-member.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseMemberDTO } from './dto/response-member.dto';

@Injectable()
export class MembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashService: HashingService,
  ) {}

  // Retrieves specific user
  async getMember(id: number) {
    return await this.databaseService.members.findUniqueOrThrow({
      where: { member_id: id },
    });
  }

  async createMember(createMemberDTO: CreateMemberDTO) {
    const member = await this.databaseService.members.create({
      data: {
        email: createMemberDTO.email,
        password: await this.hashService.hash(createMemberDTO.password),
      },
    });

    // Convert to reponseDTO
    return plainToInstance(ResponseMemberDTO, member, {
      excludeExtraneousValues: true,
    });
  }

  async updateMember(id: number, updateMemberDTO: updateMemberDTO) {
    // Try to check if member with ID exists
    const member = await this.getMember(id);

    // Update
    await this.databaseService.members.update({
      data: {
        ...updateMemberDTO,
        // Hash password
        password: updateMemberDTO.password
          ? await this.hashService.hash(updateMemberDTO.password)
          : undefined,
      },
      where: { member_id: id },
    });

    // Convert to reponseDTO
    return plainToInstance(ResponseMemberDTO, member, {
      excludeExtraneousValues: true,
    });
  }
}
