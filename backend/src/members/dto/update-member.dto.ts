import { CreateMemberDTO } from './create-member.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updateMemberDTO extends PartialType(CreateMemberDTO) {}
