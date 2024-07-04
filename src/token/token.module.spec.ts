import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenModule } from './token.module';

describe('TokenModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [TokenModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(JwtModule)).toBeInstanceOf(JwtModule);
    expect(module.get(PrismaService)).toBeInstanceOf(PrismaService);
    expect(module.get(TokenService)).toBeInstanceOf(TokenService);
    expect(module.get(TokenController)).toBeInstanceOf(TokenController);
  });
});
