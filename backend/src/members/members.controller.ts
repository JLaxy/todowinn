import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { updateMemberDTO } from './dto/update-member.dto';
import { OwnershipGuard } from 'src/ownership/ownership.guard';
import { ResourceType } from 'src/common/types/resource.types';

// /members endpoint
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // Create Member; Sign Up
  @Public() // Public endpoint; bypasses token requirement on authguard
  @Post()
  async createMember(@Body() createMemberDTO: CreateMemberDTO) {
    return await this.membersService.createMember(createMemberDTO);
  }

  // Update Member
  @Patch(':id')
  @UseGuards(
    OwnershipGuard(ResourceType.MEMBER, (req) => Number(req.params['id'])), // Ensures member is not editing other member
  )
  async updateMember(
    @Param('id', ParseIntPipe) id: number, // Use pipe to automatically convert to number
    @Body() updateMemberDTO: updateMemberDTO,
  ) {
    return this.membersService.updateMember(id, updateMemberDTO);
  }
}
