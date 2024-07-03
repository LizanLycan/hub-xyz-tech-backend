import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './auth.config';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [JwtModule.registerAsync(JwtConfig)],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
