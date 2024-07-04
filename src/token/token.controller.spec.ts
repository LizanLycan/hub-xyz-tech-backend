import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../auth/auth.config';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma.service';

describe('TokenController', () => {
  let controller: TokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.registerAsync(JwtConfig)],
      providers: [PrismaService, TokenService],
      controllers: [TokenController],
    }).compile();

    controller = module.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
