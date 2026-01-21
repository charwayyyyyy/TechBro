import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeagueTier } from '@prisma/client';

@Injectable()
export class LeaguesService {
  constructor(private prisma: PrismaService) {}

  private getCurrentWeekRange() {
    const now = new Date();
    // Reset to previous Monday (or Sunday)
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const start = new Date(now.setDate(diff));
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    
    return { start, end };
  }

  async getCurrentLeague(userId: string) {
    const { start, end } = this.getCurrentWeekRange();

    // Find existing assignment for this week
    let userLeague = await this.prisma.userLeague.findFirst({
      where: {
        userId,
        league: {
          weekStart: start,
        },
      },
      include: {
        league: true,
      },
    });

    if (!userLeague) {
      // Check if user was in a league last week to determine tier
      // For MVP, just default to BRONZE or find an existing league for this week
      
      // Find or create a League instance for this week and tier
      // We'll put everyone in one global group per tier for simplicity in MVP
      // In real app, we'd have multiple groups of 30.
      
      let league = await this.prisma.league.findFirst({
        where: {
          tier: LeagueTier.BRONZE,
          weekStart: start,
        },
      });

      if (!league) {
        league = await this.prisma.league.create({
          data: {
            tier: LeagueTier.BRONZE,
            weekStart: start,
            weekEnd: end,
          },
        });
      }

      userLeague = await this.prisma.userLeague.create({
        data: {
          userId,
          leagueId: league.id,
          rank: 0, // Recalculate later
          xpThisWeek: 0,
        },
        include: { league: true },
      });
    }

    return userLeague;
  }

  async getLeaderboard(userId: string) {
    const userLeague = await this.getCurrentLeague(userId);
    
    // Fetch top 50 in this league
    const leaderboard = await this.prisma.userLeague.findMany({
      where: {
        leagueId: userLeague.leagueId,
      },
      include: {
        user: {
          include: {
            avatar: {
              include: {
                skinItem: true,
                faceItem: true,
                hairItem: true,
                outfitItem: true,
                accessoryItem: true,
                backgroundItem: true,
              }
            }
          }
        },
      },
      orderBy: {
        xpThisWeek: 'desc',
      },
      take: 50,
    });

    // Calculate ranks
    return leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isCurrentUser: entry.userId === userId,
    }));
  }

  async addXp(userId: string, amount: number) {
    const userLeague = await this.getCurrentLeague(userId);
    
    await this.prisma.userLeague.update({
      where: { id: userLeague.id },
      data: {
        xpThisWeek: { increment: amount },
      },
    });
  }
}
