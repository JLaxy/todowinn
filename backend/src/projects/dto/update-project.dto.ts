import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from './create-project.dto';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { Status } from 'generated/prisma';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
  @IsOptional()
  @IsDateString()
  dateFinished?: Date;

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status!' })
  status?: Status;
}
