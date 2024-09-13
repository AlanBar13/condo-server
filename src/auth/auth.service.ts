import {
  ForbiddenException,
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
      relations: {
        house: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.house == null) {
      throw new ForbiddenException('User not added to house');
    }

    // TODO: Refactor this to get the password and the relation on the same query
    const userPass = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['password'],
    });
    const match = await compare(password, userPass.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.email,
      name: user.name,
      lastName: user.lastName,
      house: user.house,
    };

    // generate JWT
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }

  async hashPassword(plainPass: string): Promise<string> {
    const saltRounds = this.configService.get('SALT_ROUNDS');
    const hashed = await hash(plainPass, +saltRounds);

    return hashed;
  }
}
