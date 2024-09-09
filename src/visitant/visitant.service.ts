import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitantDto } from './dto/create-visitant.dto';
import { UpdateVisitantDto } from './dto/update-visitant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitant } from './entities/visitant.entity';
import { Repository } from 'typeorm';
import { toDataURL } from 'qrcode';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VisitantService {
  constructor(
    @InjectRepository(Visitant)
    private visitantRepository: Repository<Visitant>,
  ) {}
  async create(
    createVisitantDto: CreateVisitantDto,
    user: User,
    req: Request,
  ): Promise<Visitant> {
    const visitant = new Visitant();
    const uuid = uuidv4();

    visitant.id = uuid;
    visitant.fullName = createVisitantDto.fullName;
    visitant.startDate = createVisitantDto.startDate;
    visitant.endDate = createVisitantDto.endDate;
    visitant.house = user.house;

    // TODO: Create QR code
    const customUrl = `${this.getUrl(req)}/${uuid}`;
    console.log(customUrl);
    const qrcode = await toDataURL(customUrl);
    visitant.qrCode = qrcode;

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

  private getUrl(req: Request): string {
    return `${req.protocol}://${req.get('Host')}${req.originalUrl}`;
  }
}
