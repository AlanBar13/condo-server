import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement, AnnouncementTo } from './entities/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(@InjectRepository(Announcement) private announcementRepository: Repository<Announcement>) {}

  async create(createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = new Announcement();
    announcement.title = createAnnouncementDto.title;
    announcement.body = createAnnouncementDto.body;
    announcement.date = createAnnouncementDto.date;
    announcement.postedBy = createAnnouncementDto.postedBy;
    announcement.to = AnnouncementTo.ALL;

    return await this.announcementRepository.save(announcement);
  }

  findAll() {
    return `This action returns all announcement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} announcement`;
  }

  remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
