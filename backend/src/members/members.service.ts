import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { HashingService } from 'src/hashing/hashing.service';
import { updateMemberDTO } from './dto/update-member.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseMemberDTO } from './dto/response-member.dto';
import { Request } from 'express';

@Injectable()
export class MembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashService: HashingService,
  ) {}

  // Retrieves logged in user info safely instead of retrieving on frontend
  getMe(req: Request) {
    if (!req.member) throw new UnauthorizedException('No member found!');

    return {
      member_id: req.member?.sub,
      email: req.member?.email,
    };
  }

  // Retrieves specific user
  async getMember(id: number) {
    const member = await this.databaseService.members.findUnique({
      where: { member_id: id },
    });

    // Throw error if member does not exist
    if (!member)
      throw new NotFoundException(`Member with id ${id} does not exist!`);

    return member;
  }

  // Creates member
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

  // Updates member
  async updateMember(id: number, updateMemberDTO: updateMemberDTO) {
    // Try to check if member exists
    await this.getMember(id);

    // Update
    const member = await this.databaseService.members.update({
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
