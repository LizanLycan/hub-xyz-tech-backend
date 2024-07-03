import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../pipes/zod.pipe';
import { LoginDto, LoginSchema } from './auth.dto';
import { SiweMessage } from 'siwe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  login(@Body() body: LoginDto) {
    try {
      const siweMessage = new SiweMessage(body.message);
      return this.authService.signIn(siweMessage, body.signature);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('nonce')
  nonce() {
    return this.authService.generateInteractionNonce();
  }
}
