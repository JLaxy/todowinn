import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMemberDTO } from 'src/members/dto/create-member.dto';
import { LoginMemberDTO } from './dto/login-member.dto';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma';
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
    try {
      // Get member if exists
      const member = await this.authService.login(loginMemberDTO);

      // If null, not authorized
      if (!member) throw new UnauthorizedException();
      return member;
    } catch (error) {
      // If email and password combination fails
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnauthorizedException('Member does not exist!');
      throw error;
    }
  }
}
