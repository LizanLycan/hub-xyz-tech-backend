import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from '../auth/auth.guard';
import { AddTokenInputDto, TokenType } from './token.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @UseGuards(AuthGuard)
  @Get('findTokens')
  findToken(@Query('term') term: string) {
    return this.tokenService.findTokens(term);
  }

  @UseGuards(AuthGuard)
  @Post('addTokensToUser')
  addTokensToUser(
    @Body() tokens: AddTokenInputDto[],
    @Query('user') user: string,
  ) {
    return this.tokenService.addTokensToUser(user, tokens);
  }

  @UseGuards(AuthGuard)
  @Get('getUserTokens')
  getUserTokens(@Query('user') user: string, @Query('type') type: TokenType) {
    return this.tokenService.getTokensByUser(user, type);
  }
}
