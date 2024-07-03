import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private prisma: PrismaClient;

  async onModuleInit() {
    await this.$connect();
  }
}
