import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Connect to database on module initialization
  async onModuleInit() {
    await this.$connect();
  }

  // Disconnect from database on module shutdown
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
