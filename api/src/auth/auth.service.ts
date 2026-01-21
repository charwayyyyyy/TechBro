import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.passwordHash && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        xp: user.xp,
        level: user.level,
        avatar: user.avatar,
      },
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    
    const user = await this.usersService.create(createUserDto);
    return this.login(user);
  }

  async demoLogin() {
    const demoEmail = 'demo@techbro.com';
    let user = await this.usersService.findOneByEmail(demoEmail);
    
    if (!user) {
      // Create rich demo user if not exists
      user = await this.usersService.create({
        email: demoEmail,
        username: 'TechBroDemo',
        password: 'password123', // In a real app, this would be hashed
        avatar: { color: 'purple', accessory: 'glasses', background: 'default' },
      });
      
      // Update with rich stats
      await this.usersService.update(user.id, {
        xp: 2500,
        level: 5,
        streak: 14,
        gems: 500,
        hearts: 5
      });
      
      // Fetch again to get updated fields
      user = await this.usersService.findOne(user.id);
    }
    
    return this.login(user);
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { passwordHash, ...result } = user;
    return result;
  }
}
