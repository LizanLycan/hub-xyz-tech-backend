import { z } from 'zod';

export const SiweRawBodyMessage = z.object({
  domain: z.string(),
  address: z.string(),
  statement: z.string(),
  uri: z.string(),
  version: z.string(),
  chainId: z.number(),
  nonce: z.string(),
  issuedAt: z.string(),
});

export const LoginSchema = z
  .object({
    message: SiweRawBodyMessage,
    signature: z.string(),
  })
  .required();

export type SiweRawBodyMessageDto = z.infer<typeof SiweRawBodyMessage>;
export type LoginDto = z.infer<typeof LoginSchema>;
