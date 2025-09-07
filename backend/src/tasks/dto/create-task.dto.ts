import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  dateTarget?: Date;

  @IsOptional()
  remarks?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  project_id: number;
}
