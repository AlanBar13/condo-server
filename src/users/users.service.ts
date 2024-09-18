import { ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
    try {
      const user = new User();

      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.isOwner = createUserDto.isOwner;
      user.lastName = createUserDto.lastName;
      user.role = createUserDto.role;

      if (createUserDto.houseId !== null){
        user.houseId = createUserDto.houseId;
      }

      const hashedPass = await this.authService.hashPassword(
        createUserDto.password,
      );
      user.password = hashedPass;

      const { id } = await this.userRepository.save(user);

      return this.userRepository.findOne({ where: { id }, select: { password: false }, relations: { house: { condo: true }}});
    } catch (error) {
      Logger.warn(error)
      throw new InternalServerErrorException("User could not be created")
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: { house: { condo: true } },
    });

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { house: { condo: true } },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const newUser = await this.userRepository.findOne({
      where: { id },
      select: { password: false },
    });

    return newUser;
  }

  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return `User #${id} removed`;
  }

  async addUserToHouse(userId: number, houseId: number): Promise<string> {
    const house = await this.houseRepository.findOne({where:{ id: houseId }, relations: ["condo", "habitants"]});
    if (house === null) {
      throw new NotFoundException('House not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    if (house.habitants.some(habitant => habitant.id === user.id)) {
      throw new ForbiddenException("User already belongs to house")
    }

    user.house = house;
    await this.userRepository.update(userId, user);
    return `User ${user.name} ${user.lastName} added to house ${house.condo.name} ${house.number}`;
  }

  async removeUserFromHouse(userId: number, houseId: number): Promise<string> {
    const house = await this.houseRepository.findOne({where:{ id: houseId }, relations: ["condo", "habitants"]});
    if (house === null) {
      throw new NotFoundException('House not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    if (!house.habitants.some(habitant => habitant.id === user.id)) {
      throw new ForbiddenException("User does not belong to house")
    }

    user.house = null;
    await this.userRepository.update(userId, user);
    return `User ${user.name} ${user.lastName} removed from house ${house.condo.name} ${house.number}`;
  }
}
