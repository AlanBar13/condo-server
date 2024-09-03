import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async singIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: username },
      select: { password: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    // generate JWT
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(plainPass: string): Promise<string> {
    const saltRounds = this.configService.get('SALT_ROUNDS');
    const hashed = await hash(plainPass, +saltRounds);

    return hashed;
  }
}
