import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PraxisController } from './praxis.controller';
import { PraxisService } from './praxis.service';
import { PraxisSchema } from './schemas/praxis.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }])],
  controllers: [PraxisController],
  providers: [PraxisService],
  exports: [PraxisService]
})
export class PraxisModule {}
