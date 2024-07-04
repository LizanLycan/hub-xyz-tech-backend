import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../auth/auth.config';
import { PrismaService } from '../prisma.service';
import { TokenController } from './token.controller';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.registerAsync(JwtConfig)],
      providers: [PrismaService, TokenService],
      controllers: [TokenController],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
