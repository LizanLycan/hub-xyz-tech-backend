import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module.get(AuthModule)).toBeInstanceOf(AuthModule);
    expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule);
    expect(module.get(UserModule)).toBeInstanceOf(UserModule);
    expect(module.get(TokenModule)).toBeInstanceOf(TokenModule);
  });
});
