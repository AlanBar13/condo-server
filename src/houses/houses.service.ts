import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    const house = new House();

    house.condoId = createHouseDto.condoId;
    house.address = createHouseDto.address;
    house.number = createHouseDto.number;

    const { id } = await this.houseRepository.save(house);

    return this.houseRepository.findOne({
      where: { id },
      relations: { condo: true },
    });
  }

  findAll(): Promise<House[]> {
    return this.houseRepository.find({
      relations: ['habitants', 'condo'],
    });
  }

  findOne(id: number): Promise<House> {
    return this.houseRepository.findOne({
      where: { id },
      relations: ['visitantRequest', 'habitants', 'condo'],
    });
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
