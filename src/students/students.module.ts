import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UserSchema } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PraxisService } from '../praxis/praxis.service';
import { PraxisSchema } from '../praxis/schemas/praxis.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService, PraxisService]
})
export class StudentsModule {}
