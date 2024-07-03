import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getOrCreateUser(address: string) {
    const fetchedUser = await this.prismaService.user.findUnique({
      where: {
        address: address.toLocaleLowerCase(),
      },
    });

    if (fetchedUser) {
      return fetchedUser;
    }

    return await this.prismaService.user.create({
      data: {
        address: address.toLocaleLowerCase(),
      },
    });
  }
}
