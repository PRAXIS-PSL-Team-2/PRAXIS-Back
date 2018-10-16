import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorsController } from './professors.controller';

describe('Professors Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ProfessorsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ProfessorsController = module.get<ProfessorsController>(ProfessorsController);
    expect(controller).toBeDefined();
  });
});
