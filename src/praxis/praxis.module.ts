import { Module } from '@nestjs/common';
import { PraxisController } from './praxis.controller';
import { PraxisService } from './praxis.service';

@Module({
  controllers: [PraxisController],
  providers: [PraxisService]
})
export class PraxisModule {}
