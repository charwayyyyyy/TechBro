import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { LeaguesModule } from './leagues/leagues.module';
import { LessonsModule } from './lessons/lessons.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    AvatarModule,
    LeaguesModule,
    LessonsModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
