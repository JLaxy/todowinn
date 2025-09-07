import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-task.dto';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { Status } from 'generated/prisma';

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsOptional()
  @IsDateString()
  dateFinished?: Date;

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status!' })
  status?: Status;
}
