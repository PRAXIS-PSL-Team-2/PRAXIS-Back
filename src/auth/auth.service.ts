import { Configuration } from 'shared/configuration/configuration.enum';
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
import { ConfigurationService } from '../shared/configuration/configuration.service';

@Injectable()
export class AuthService {
    static JWT_KEY;
    constructor(private readonly usersService: UsersService,
                private readonly _configurationService: ConfigurationService,
                @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) {
                    AuthService.JWT_KEY = _configurationService.get(Configuration.JWT_KEY);
                }

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
        
        const expiresIn = '12h';

        const accessToken = jwt.sign({ id: user._id,
            username: user.username,
            role: user.role }, AuthService.JWT_KEY, { expiresIn });

        return {
            accessToken,
            user: {
                id: user._id,
                role: user.role
            }
        };
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findByUsername(payload.username);
    }
}
