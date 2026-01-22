import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('leaderboard')
  getLeaderboard(@Request() req: any) {
    return this.leaguesService.getLeaderboard(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current')
  getCurrentLeague(@Request() req: any) {
    return this.leaguesService.getCurrentLeague(req.user.userId);
  }
}
