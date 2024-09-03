import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitantDto } from './dto/create-visitant.dto';
import { UpdateVisitantDto } from './dto/update-visitant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitant } from './entities/visitant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitantService {
  constructor(
    @InjectRepository(Visitant)
    private visitantRepository: Repository<Visitant>,
  ) {}
  create(createVisitantDto: CreateVisitantDto): Promise<Visitant> {
    const visitant = new Visitant();

    visitant.fullName = createVisitantDto.fullName;
    visitant.startDate = createVisitantDto.startDate;
    visitant.endDate = createVisitantDto.endDate;

    // TODO: Create QR code
    visitant.qrCode = 'Testqrcode';

    return this.visitantRepository.save(visitant);
  }

  findAll(): Promise<Visitant[]> {
    return this.visitantRepository.find({ relations: { house: true } });
  }

  findOne(id: string): Promise<Visitant> {
    return this.visitantRepository.findOne({
      where: { id },
      relations: { house: true },
    });
  }

  async update(
    id: string,
    updateVisitantDto: UpdateVisitantDto,
  ): Promise<Visitant> {
    const visitant = await this.visitantRepository.findOneBy({ id });
    if (visitant === null) {
      throw new NotFoundException('Visitant not found');
    }

    visitant.fullName = updateVisitantDto.fullName;
    visitant.startDate = updateVisitantDto.startDate;
    visitant.endDate = updateVisitantDto.endDate;
    await this.visitantRepository.update(id, visitant);

    return this.visitantRepository.findOne({
      where: { id },
      relations: { house: true },
    });
  }

  async remove(id: string): Promise<string> {
    await this.visitantRepository.delete(id);

    return `Visitant #${id} deleted`;
  }
}
