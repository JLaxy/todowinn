import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMemberDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
