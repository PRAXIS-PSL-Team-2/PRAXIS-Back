import { Module } from '@nestjs/common';
import { PraxisController } from './praxis.controller';
import { PraxisService } from './praxis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PraxisSchema } from './schemas/praxis.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }])],
  controllers: [PraxisController],
  providers: [PraxisService]
})
export class PraxisModule {}
