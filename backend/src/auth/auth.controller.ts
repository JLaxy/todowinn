import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
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
  async login(
    @Body() loginMemberDTO: LoginMemberDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Try to login
    return await this.authService.login(loginMemberDTO, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
