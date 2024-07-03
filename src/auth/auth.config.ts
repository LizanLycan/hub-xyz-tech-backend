import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => ({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d' },
  }),
};
