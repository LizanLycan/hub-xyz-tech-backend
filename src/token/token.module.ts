import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../auth/auth.config';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [JwtModule.registerAsync(JwtConfig)],
  providers: [PrismaService, TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
