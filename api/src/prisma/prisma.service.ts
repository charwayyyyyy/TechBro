import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
