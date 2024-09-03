import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { House } from 'src/houses/entities/house.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(House) private houseRepository: Repository<House>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.isOwner = createUserDto.isOwner;
    user.lastName = createUserDto.lastName;

    const hashedPass = await this.authService.hashPassword(
      createUserDto.password,
    );
    user.password = hashedPass;

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        house: true,
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: { house: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);

    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return `User #${id} removed`;
  }

  async addUserToHouse(userId: number, houseId: number) {
    const house = await this.houseRepository.findOneBy({ id: houseId });
    if (house === null) {
      throw new NotFoundException('House not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    user.house = house;

    return this.userRepository.update(userId, user);
  }
}
