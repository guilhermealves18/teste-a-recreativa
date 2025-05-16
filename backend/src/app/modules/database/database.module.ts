import { DynamicModule, Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
  ],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const prismaProvider = {
      provide: 'PrismaService',
      useClass: PrismaService,
    };
    return {
      module: DatabaseModule,
      providers: [prismaProvider],
      exports: [prismaProvider],
    };
  }
}
