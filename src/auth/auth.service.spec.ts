import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.registerAsync(JwtConfig)],
      controllers: [AuthController],
      providers: [PrismaService, AuthService, UserService],
      exports: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
