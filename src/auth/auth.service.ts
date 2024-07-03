import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateNonce, SiweMessage } from 'siwe';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(
    message: SiweMessage,
    signature: string,
  ): Promise<{
    access_token: string;
    id: string;
  }> {
    const address = await this.verifySignature(message, signature);

    const user = await this.userService.getOrCreateUser(address);

    const payload = {
      sub: user.id,
      address: address,
    };

    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generateInteractionNonce(): Promise<{ nonce: string }> {
    return { nonce: generateNonce() };
  }

  async verifySignature(
    message: SiweMessage,
    signature: string,
  ): Promise<string> {
    const siweMessage = new SiweMessage(message);
    const res = await siweMessage.verify({ signature });

    return res.data.address;
  }
}
