import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // Create basic avatar structure
    const defaultAvatar = {
      color: 'blue',
      accessory: 'none',
      background: 'default',
    };

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        passwordHash: hashedPassword,
        avatar: createUserDto.avatar || defaultAvatar,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
