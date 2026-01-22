import { Module, OnModuleInit } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AvatarController],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule implements OnModuleInit {
  constructor(private avatarService: AvatarService) {}

  async onModuleInit() {
    await this.avatarService.seedDefaultItems();
  }
}
