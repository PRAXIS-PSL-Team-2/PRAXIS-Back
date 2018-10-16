import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), UsersService]
})
export class UsersModule {}
