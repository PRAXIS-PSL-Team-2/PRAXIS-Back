import { StudentData } from './../students/interfaces/student.interface';
import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) { }

    async register(user: IUser) {
        let status: RegistrationStatus = { success: true, message: 'user register' };

        if (user.role == 'student') {
            await this.userModel.register(new this.userModel({
                username: user.username,
                role: user.role,
                studentData: user.studentData}), user.password, (err) => {
                if (err) {
                    debug(err);
                    status = { success: false, message: err };
                }
            });
        }
        
        return status;
    }

    createToken(user) {
        console.log('get the expiration');
        const expiresIn = '12h';
        console.log('sign the token');
        console.log(user);

        const accessToken = jwt.sign({ id: user._id,
            username: user.username,
            role: user.role,
            studentData: user.studentData }, 'ILoveNestjs', { expiresIn });
        console.log('return the token');
        console.log(accessToken);
        return {
            accessToken,
            user: {
                id: user._id,
                role: user.role
            }
        };
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findById(payload.id);
    }
}
