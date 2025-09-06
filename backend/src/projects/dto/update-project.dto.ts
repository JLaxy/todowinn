import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from './create-project.dto';
import { IsDateString, IsOptional } from 'class-validator';
import { Status } from 'generated/prisma';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
  @IsOptional()
  @IsDateString()
  dateFinished?: Date;

  @IsOptional()
  status?: Status;
}
