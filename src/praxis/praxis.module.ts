import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PraxisController } from './praxis.controller';
import { PraxisService } from './praxis.service';
import { PraxisSchema } from './schemas/praxis.schema';
import { StudentsService } from '../students/students.service';
import { UserSchema } from '../users/schemas/user.schema';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [PraxisController],
  providers: [PraxisService, StudentsService, AuthService, UsersService],
  exports: [PraxisService]
})
export class PraxisModule {}
