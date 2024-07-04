import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(PrismaService)).toBeInstanceOf(PrismaService);
    expect(module.get(UserService)).toBeInstanceOf(UserService);
  });
});
