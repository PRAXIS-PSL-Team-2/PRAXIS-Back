import { Module, forwardRef } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UserSchema } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PraxisService } from '../praxis/praxis.service';
import { PraxisSchema } from '../praxis/schemas/praxis.schema';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Praxis', schema: PraxisSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [StudentsController],
  providers: [StudentsService, PraxisService, AuthService, UsersService]
})
export class StudentsModule {}
