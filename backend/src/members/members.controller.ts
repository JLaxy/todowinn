import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { updateMemberDTO } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getMembers() {
    return await this.membersService.getAllMembers();
  }

  @Public()
  @Post()
  async createMember(@Body() createMemberDTO: CreateMemberDTO) {
    return await this.membersService.createMember(createMemberDTO);
  }

  @Public()
  @Patch(':id')
  async updateMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDTO: updateMemberDTO,
  ) {
    return this.membersService.updateMember(id, updateMemberDTO);
  }
}
