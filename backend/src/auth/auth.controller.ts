import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateMemberDTO } from 'src/members/dto/create-member.dto';
import { LoginMemberDTO } from './dto/login-member.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createMemberDTO: CreateMemberDTO) {
    return createMemberDTO;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginMemberDTO: LoginMemberDTO) {
    // Get member if exists
    return await this.authService.login(loginMemberDTO);
  }
}
