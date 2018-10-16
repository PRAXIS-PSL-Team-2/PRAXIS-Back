import { Test, TestingModule } from '@nestjs/testing';
import { PraxisController } from './praxis.controller';

describe('Praxis Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PraxisController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PraxisController = module.get<PraxisController>(PraxisController);
    expect(controller).toBeDefined();
  });
});
