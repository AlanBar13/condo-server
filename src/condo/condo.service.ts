import { Injectable } from '@nestjs/common';
import { CreateCondoDto } from './dto/create-condo.dto';
import { UpdateCondoDto } from './dto/update-condo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Condo } from './entities/condo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CondoService {
  constructor(
    @InjectRepository(Condo) private condoRepository: Repository<Condo>,
  ) {}

  create(createCondoDto: CreateCondoDto) {
    const condo = new Condo();

    condo.name = createCondoDto.name;
    condo.NHouses = createCondoDto.NHouses;
    condo.address = createCondoDto.address;

    return this.condoRepository.save(condo);
  }

  findAll() {
    return this.condoRepository.find();
  }

  findOne(id: number) {
    return this.condoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCondoDto: UpdateCondoDto) {
    await this.condoRepository.update(id, updateCondoDto);

    return this.condoRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.condoRepository.delete(id);

    return `Condo #${id} removed`;
  }
}
