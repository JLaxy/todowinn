import { Body, Controller, Get, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDTO } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getMembers() {
    return await this.membersService.getAllMembers();
  }

  @Post()
  async createMember(@Body() createMemberDTO: CreateMemberDTO) {
    return await this.membersService.createMember(createMemberDTO);
  }
}
