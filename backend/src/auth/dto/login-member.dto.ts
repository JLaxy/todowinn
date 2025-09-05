import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginMemberDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
