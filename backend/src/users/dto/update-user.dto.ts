import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  xp?: number;
  level?: number;
  streak?: number;
  hearts?: number;
  gems?: number;
}
