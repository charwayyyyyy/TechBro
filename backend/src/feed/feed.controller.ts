import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { FeedService } from './feed.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getFeed(@Request() req: any) {
    return this.feedService.getFeed(req.user.userId);
  }
}
