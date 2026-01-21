import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FeedEventType } from '@prisma/client';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async createEvent(userId: string, type: FeedEventType, payload: any) {
    return this.prisma.feedEvent.create({
      data: {
        userId,
        type,
        payload,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getFeed(_userId: string) {
    // For MVP, just get global feed or user's own feed + following
    // Since we don't have following UI yet, let's just show "Global Recent Activity" or just User's activity

    // Better: Show events from everyone (Small community vibe)
    return this.prisma.feedEvent.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: {
              include: {
                skinItem: true,
                faceItem: true,
                hairItem: true,
                outfitItem: true,
                accessoryItem: true,
                backgroundItem: true,
              },
            },
          },
        },
      },
    });
  }
}
