import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './auth.config';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.registerAsync(JwtConfig)],
      controllers: [AuthController],
      providers: [PrismaService, AuthService, UserService],
      exports: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
