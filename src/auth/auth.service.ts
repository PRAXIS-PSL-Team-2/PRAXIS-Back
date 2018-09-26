import { Configuration } from 'shared/configuration/configuration.enum';
import { StudentData } from './../students/interfaces/student.interface';
import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthService implements OnModuleInit {
    static JWT_KEY;
    private usersService: UsersService;

    constructor(private readonly moduleRef: ModuleRef,
                private readonly _configurationService: ConfigurationService,
                @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) {
                    AuthService.JWT_KEY = _configurationService.get(Configuration.JWT_KEY);
                }

    onModuleInit() {
        this.usersService = this.moduleRef.get(UsersService);
    }

    async register(user: IUser) {
        let status: RegistrationStatus = { success: true, message: 'user register' };

        if (user.role == 'student') {
            await this.userModel.register(new this.userModel({
                username: user.username,
                email: user.email,
                role: user.role,
                studentData: user.studentData}), user.password, (err) => {
                if (err) {
                    debug(err);
                    status = { success: false, message: err };
                }
            });
        } else if(user.role == 'professor') {
            await this.userModel.register(new this.userModel({
                username: user.username,
                email: user.email,
                role: user.role,
                professorData: user.professorData}), user.password, (err) => {
                if (err) {
                    debug(err);
                    status = { success: false, message: err };
                }
            });
        } else if (user.role == 'admin') {
            await this.userModel.register(new this.userModel({
                username: user.username,
                email: user.email,
                role: user.role}), user.password, (err) => {
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
