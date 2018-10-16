import { Injectable, HttpException, HttpStatus, Next } from '@nestjs/common';
import { Model, Types, Schema, PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PraxisService } from '../praxis/praxis.service';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { ProfessorData } from './interfaces/professor.interface';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Injectable()
export class ProfessorsService {
    constructor(
        @InjectModel('User') private readonly professorModel: PassportLocalModel<IUser>,
        @InjectModel('User') private readonly professorDataModel: Model<ProfessorData>,
        private readonly authService: AuthService,
        private readonly UserService: UsersService,
        // private readonly praxisService: PraxisService
    ) {}

    async findAll(): Promise<IUser[] | Error> {
        try {
            return await this.professorModel.find({role: 'professor'}).exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async findById(id: String): Promise<IUser | Error> {
        try {
            return await this.professorModel.findById(id).exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async create( createProfessorDto: CreateProfessorDto): Promise<any | Error> {

        try {
            const newProfessor = await this.professorMapper(createProfessorDto);

            const response = await this.authService.register(newProfessor);

            return response;

        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async update(ID: String, newValue: any): Promise<IUser | Error> {
        const user = await this.professorModel.findById(ID).exec();

        if (!user._id) {
            throw new HttpException({
                status: false,
                code: HttpStatus.FORBIDDEN,
                error: 'User not found.',
            }, 403);
        }

        try {
            await this.professorModel.findByIdAndUpdate(ID, newValue).exec();

            return await this.professorModel.findById(ID).exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }

    async delete(ID: String): Promise<boolean | Error> {
        const user = await this.professorModel.findById(ID).exec();

        if (!user._id) {
            throw new HttpException({
                status: false,
                code: HttpStatus.FORBIDDEN,
                error: 'User not found.',
            }, 403);
        }

        try {
            await this.professorModel.findByIdAndRemove(ID).exec();
            return true;
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }
    
    async professorMapper( createProfessorDto: CreateProfessorDto): Promise<IUser> {

        const newProfessor = new this.professorModel(createProfessorDto);

        const newProfessorData = new this.professorDataModel();

        newProfessor.professorData = newProfessorData;

        newProfessor.role = 'professor';
        
        newProfessor.professorData.name = createProfessorDto.name;
        newProfessor.professorData.lastName = createProfessorDto.lastName;
        newProfessor.professorData.specialty = createProfessorDto.specialty;
        newProfessor.professorData.selfDescription = createProfessorDto.selfDescription;
        
        return newProfessor;
    }
}

