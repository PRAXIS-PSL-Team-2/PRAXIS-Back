import { Model, PassportLocalModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { IUsersService } from './interfaces/iusers.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from '../auth/auth.service';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>,
        private readonly authService: AuthService
    ) {}
    
    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findOne(options: object): Promise<IUser> {
        return await this.userModel.findOne(options).exec();
    }

    async findById(ID: number): Promise<IUser> {
        return await this.userModel.findById(ID).exec();
    }

    async findByUsername(username: string): Promise<IUser> {
        return await this.userModel.findOne({"username": username}).exec();
    }
    async create(createUserDto: CreateAdminDto): Promise<any | Error> {
        try {
            const createdUser = new this.userModel(createUserDto);
            createdUser.role = 'admin';
            
            const response = await this.authService.register(createdUser);

            return response;
        } catch(e) {
            const error = new Error()
            error.message = String(e);

            return error;
        }
    }

    async update(ID: number, newValue: IUser): Promise<IUser> {
        const user = await this.userModel.findById(ID).exec();

        if (!user._id) {
            debug('user not found');
        }

        await this.userModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.userModel.findById(ID).exec();
    }
    async delete(ID: number): Promise<string> {
        try {
            await this.userModel.findByIdAndRemove(ID).exec();
            return 'The user has been deleted';
        }
        catch (err) {
            debug(err);
            return 'The user could not be deleted';
        }
    }

    async checkIfUsernameExist( input: String): Promise<Boolean | Error> {

        try {
            const result = await this.userModel.find({username: input}).exec();
            return (result.length == 0);
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async checkIfEmailExist( input: String): Promise<Boolean | Error> {

        try {
            const result = await this.userModel.find({"studentData.email" : input}).exec();
            const result2 = await this.userModel.find({"professorData.email" : input}).exec();

            return ( (result.length == 0) && (result2.length == 0) );
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }
}