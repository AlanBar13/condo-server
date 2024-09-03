import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HousesService {
  constructor(@InjectRepository(House) private houseRepository: Repository<House>) {}

  create(createHouseDto: CreateHouseDto): Promise<House> {
    const house = new House();

    house.condo = createHouseDto.condo;
    house.address = createHouseDto.address;
    house.number = createHouseDto.number;

    return this.houseRepository.save(house);
  }

  findAll(): Promise<House[]> {
    return this.houseRepository.find({ relations: {
      habitants: true
    }});
  }

  findOne(id: number): Promise<House> {
    return this.houseRepository.findOne({ where: { id }, relations: { habitants: true }});
  }

  async update(id: number, updateHouseDto: UpdateHouseDto): Promise<House> {
    await this.houseRepository.update(id, updateHouseDto);

    return this.houseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<string> {
    await this.houseRepository.delete(id);

    return `House #${id} removed`;
  }
}
