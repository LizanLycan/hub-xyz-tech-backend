import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(JwtModule)).toBeInstanceOf(JwtModule);
    expect(module.get(AuthController)).toBeInstanceOf(AuthController);
    expect(module.get(PrismaService)).toBeInstanceOf(PrismaService);
    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
    expect(module.get(UserService)).toBeInstanceOf(UserService);
  });
});
