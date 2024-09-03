import { Test, TestingModule } from '@nestjs/testing';
import { VisitantController } from './visitant.controller';
import { VisitantService } from './visitant.service';

describe('VisitantController', () => {
  let controller: VisitantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitantController],
      providers: [VisitantService],
    }).compile();

    controller = module.get<VisitantController>(VisitantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
