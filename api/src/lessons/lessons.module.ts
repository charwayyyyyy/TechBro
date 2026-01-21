import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LeaguesModule } from '../leagues/leagues.module';
import { FeedModule } from '../feed/feed.module';

@Module({
  imports: [PrismaModule, LeaguesModule, FeedModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
