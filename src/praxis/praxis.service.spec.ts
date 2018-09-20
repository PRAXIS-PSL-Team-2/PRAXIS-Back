import { Test, TestingModule } from '@nestjs/testing';
import { PraxisService } from './praxis.service';

describe('PraxisService', () => {
  let service: PraxisService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PraxisService],
    }).compile();
    service = module.get<PraxisService>(PraxisService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
