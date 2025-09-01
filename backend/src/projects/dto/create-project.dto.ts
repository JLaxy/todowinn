import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsDateString()
  @IsNotEmpty()
  dateCreated: string;
}
