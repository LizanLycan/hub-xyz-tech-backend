import z from 'zod';
import { TokenSchema } from '../token/token.dto';

export const UserSchema = z.object({
  id: z.string(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tokens: z.array(TokenSchema).optional(),
});

export type UserDto = z.infer<typeof UserSchema>;
