import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeaguesService } from '../leagues/leagues.service';
import { FeedService } from '../feed/feed.service';
import { CourseDifficulty, LessonType, FeedEventType } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
    private leaguesService: LeaguesService,
    private feedService: FeedService,
  ) {}

  async getAllCourses() {
    return this.prisma.course.findMany({
      include: {
        lessons: {
          orderBy: { position: 'asc' },
        },
      },
    });
  }

  async getLesson(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async completeLesson(userId: string, lessonId: string, score: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    // 1. Record Progress
    const progress = await this.prisma.progress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        completed: true,
        score,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        score: { set: score }, // Keep highest? For now just overwrite
        completedAt: new Date(),
      },
    });

    // 2. Add XP (if not already completed? Or allow grinding?)
    // For MVP, allow grinding but maybe reduced XP?
    // Let's just give full XP for now.
    const xpEarned = lesson.xpReward;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpEarned },
      },
    });

    // 3. Update League XP
    await this.leaguesService.addXp(userId, xpEarned);

    // 4. Update Streak
    // Check if user has already extended streak today
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const now = new Date();
    const lastStreak = user?.lastStreakAt ? new Date(user.lastStreakAt) : null;

    let streakUpdated = false;

    if (!lastStreak) {
      // First time
      await this.prisma.user.update({
        where: { id: userId },
        data: { streak: 1, lastStreakAt: now },
      });
      streakUpdated = true;
    } else {
      const isToday = lastStreak.toDateString() === now.toDateString();
      const isYesterday =
        new Date(now.setDate(now.getDate() - 1)).toDateString() ===
        lastStreak.toDateString();

      if (!isToday) {
        if (isYesterday) {
          await this.prisma.user.update({
            where: { id: userId },
            data: { streak: { increment: 1 }, lastStreakAt: new Date() },
          });
          streakUpdated = true;
        } else {
          // Reset
          await this.prisma.user.update({
            where: { id: userId },
            data: { streak: 1, lastStreakAt: new Date() },
          });
          streakUpdated = true;
        }
      }
    }

    // 5. Create Feed Event
    await this.feedService.createEvent(userId, FeedEventType.LESSON_COMPLETED, {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      xpEarned,
    });

    if (streakUpdated) {
      await this.feedService.createEvent(
        userId,
        FeedEventType.STREAK_MILESTONE,
        {
          days: user?.streak ? user.streak + 1 : 1,
        },
      );
    }

    return {
      xpEarned,
      streakUpdated,
      progress,
    };
  }

  async seedContent() {
    const count = await this.prisma.course.count();
    if (count > 0) return;

    // Create Python Course
    const python = await this.prisma.course.create({
      data: {
        language: 'Python',
        difficulty: CourseDifficulty.BEGINNER,
      },
    });

    // Create Lessons
    const lessons = [
      {
        title: 'Variables',
        type: LessonType.MULTI_CHOICE,
        xpReward: 10,
        position: 1,
        content: {
          question: 'What is the correct way to declare a variable in Python?',
          options: ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'],
          correctIndex: 2,
        },
      },
      {
        title: 'Data Types',
        type: LessonType.MULTI_CHOICE,
        xpReward: 15,
        position: 2,
        content: {
          question: 'Which of these is NOT a Python data type?',
          options: ['Integer', 'Float', 'String', 'Char'],
          correctIndex: 3,
        },
      },
    ];

    for (const l of lessons) {
      await this.prisma.lesson.create({
        data: {
          courseId: python.id,
          ...l,
        },
      });
    }
  }
}
