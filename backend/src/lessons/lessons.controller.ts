import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  OnModuleInit,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lessons')
export class LessonsController implements OnModuleInit {
  constructor(private readonly lessonsService: LessonsService) {}

  async onModuleInit() {
    await this.lessonsService.seedContent();
  }

  @Get('courses')
  getAllCourses() {
    return this.lessonsService.getAllCourses();
  }

  @Get(':id')
  getLesson(@Param('id') id: string) {
    return this.lessonsService.getLesson(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/complete')
  completeLesson(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { score: number },
  ) {
    return this.lessonsService.completeLesson(req.user.userId, id, body.score);
  }
}
