import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { House } from 'src/houses/entities/house.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { OAuthUser } from './dto/oauth-user';

export interface TokenInfo {
  id: number;
  username: string;
  name: string;
  role: string;
  lastName: string;
  house: House;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: TokenInfo) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return token;
  }

  async hashPassword(plainPass: string): Promise<string> {
    const saltRounds = this.configService.get('SALT_ROUNDS');
    const hashed = await hash(plainPass, +saltRounds);

    return hashed;
  }

  async singIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: username },
      relations: {
        house: {
          condo: true,
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
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

    const payload: TokenInfo = {
      id: user.id,
      username: user.email,
      name: user.name,
      role: user.role,
      lastName: user.lastName,
      house: user.house,
    };

    // generate JWT
    return {
      access_token: await this.generateToken(payload),
    };
  }

  async oAuthLogin(userInfo: OAuthUser): Promise<string | null> {
    try {
      if (!userInfo) {
        throw new InternalServerErrorException('OAuth User not found!');
      }

      const user = await this.userRepository.findOne({
        where: { email: userInfo.email },
        relations: {
          house: {
            condo: true,
          }
        },
      });

      if (!user) {
        const user = new User();

        user.name = userInfo.name;
        user.email = userInfo.email;
        user.lastName = userInfo.lastName;
        user.password = userInfo.accessToken;

        const createdUser = await this.userRepository.save(user);

        const newUser = await this.userRepository.findOne({ where: { id: createdUser.id }, relations: { house: { condo: true } } });

        const payload: TokenInfo = {
          id: newUser.id,
          username: newUser.email,
          name: newUser.name,
          role: newUser.role,
          lastName: newUser.lastName,
          house: newUser.house,
        };

        return await this.generateToken(payload);
      }

      const payload: TokenInfo = {
        id: user.id,
        username: user.email,
        name: user.name,
        role: user.role,
        lastName: user.lastName,
        house: user.house,
      };

      return await this.generateToken(payload);
    } catch (error) {
      Logger.error(error);
    }
  }
}
