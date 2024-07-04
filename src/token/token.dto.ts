import z from 'zod';
import { UserSchema } from '../user/user.dto';

export const TokenType = z.enum(['token', 'nft']);
export type TokenType = z.infer<typeof TokenType>;

export const TokenSchema = z.object({
  id: z.string(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  bookmarked: z.boolean(),
  user: UserSchema,
  userId: z.string(),
  tokenId: z.string(),
  type: TokenType,
});

export const UserToken = TokenSchema.extend({
  name: z.string(),
  symbol: z.string(),
  logo: z.string(),
  price: z.string(),
});

export const AddTokenInputSchema = UserToken.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  user: true,
  userId: true,
  price: true,
});

export const TokensInput = z.array(AddTokenInputSchema);
export type UserTokenDto = z.infer<typeof UserToken>;
export type TokenDto = z.infer<typeof TokenSchema>;
export type AddTokenInputDto = z.infer<typeof AddTokenInputSchema>;
