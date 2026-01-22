import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get('items')
  getAllItems() {
    return this.avatarService.getAllItems();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUserAvatar(@Request() req: any) {
    return this.avatarService.getUserAvatar(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  updateAvatar(
    @Request() req: any,
    @Body()
    body: {
      skinColor?: string;
      skinItemId?: string;
      faceItemId?: string;
      hairItemId?: string;
      outfitItemId?: string;
      accessoryItemId?: string;
      backgroundItemId?: string;
    },
  ) {
    return this.avatarService.updateAvatar(req.user.userId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('buy/:itemId')
  buyItem(@Request() req: any, @Param('itemId') itemId: string) {
    return this.avatarService.buyItem(req.user.userId, itemId);
  }
}
