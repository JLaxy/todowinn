import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  dateTarget?: Date;

  @IsOptional()
  remarks?: string;
}
