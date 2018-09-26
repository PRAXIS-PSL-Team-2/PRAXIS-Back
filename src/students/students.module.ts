import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UserSchema } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PraxisService } from '../praxis/praxis.service';
import { PraxisSchema } from '../praxis/schemas/praxis.schema';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { ClassSchema } from '../praxis/schemas/class.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }]),
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [StudentsController],
  providers: [StudentsService, PraxisService, AuthService, UsersService],
  exports: [StudentsService]
})
export class StudentsModule {}
