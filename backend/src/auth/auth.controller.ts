import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CreateMemberDTO } from 'src/members/dto/create-member.dto';
import { LoginMemberDTO } from './dto/login-member.dto';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createMemberDTO: CreateMemberDTO) {
    return createMemberDTO;
  }

  @Post('login')
  async login(@Body() loginMemberDTO: LoginMemberDTO) {
    try {
      const toLogin = await this.authService.login(loginMemberDTO);

      if (!toLogin) throw new UnauthorizedException();
      return toLogin;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnauthorizedException();
      throw error;
    }
  }
}
