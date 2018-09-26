import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { AuthService } from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { PraxisSchema } from '../praxis/schemas/praxis.schema';
import { PraxisService } from '../praxis/praxis.service';
import { ClassSchema } from '../praxis/schemas/class.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }]),
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService, AuthService, UsersService],
  exports: [ProfessorsService]
})
export class ProfessorsModule {}
