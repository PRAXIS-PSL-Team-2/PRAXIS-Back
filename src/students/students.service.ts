
import { Injectable, Inject, forwardRef, HttpException, HttpStatus, Next } from '@nestjs/common';
import { StudentData } from './interfaces/student.interface';
import { Model, Types, Schema, PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { PraxisService } from '../praxis/praxis.service';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { Praxis, Class } from '../praxis/interfaces/praxis.interface';



@Injectable()
export class StudentsService {
    constructor(
        @InjectModel('User') private readonly studentModel: PassportLocalModel<IUser>,
        @InjectModel('User') private readonly studentDataModel: Model<StudentData>,
        private readonly authService: AuthService,
        private readonly UserService: UsersService,
        private readonly praxisService: PraxisService
    ) {}

    async findAll(): Promise<IUser[] | Error> {
        try {
            return await this.studentModel.find({role: 'student'}).exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async create( createStudentDto: CreateStudentDto): Promise<any | Error> {

        try {
            const newStudent = await this.studentMapper(createStudentDto);

            const response = await this.authService.register(newStudent);

            if(response.success) {
                setTimeout(async () => 
                    await this.studentModel.findOne({"username": newStudent.username}).exec(
                        (err, student) => {
                            if(err) {
                                return response;
                            } else {
                                this.praxisService.setStudentCandidateToPraxis(student._id, student.studentData.praxisVersion);
                            }
                        }
                ), 1000);
            }
            return response;

        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async update(ID: String, newValue: any): Promise<IUser | Error> {
        const user = await this.studentModel.findById(ID).exec();

        if (!user._id) {
            throw new HttpException({
                status: false,
                code: HttpStatus.FORBIDDEN,
                error: 'User not found.',
            }, 403);
        }

        try {
            await this.studentModel.findByIdAndUpdate(ID, newValue).exec();

            return await this.studentModel.findById(ID).exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }

    async changeStatusToAccepted( studentId: String): Promise<Boolean | Error> {

        try {
            await this.studentModel.update(studentId,{'studentData.status': 'accepted'}).exec();
            return true;

        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return false;
        }

    }
    
    async studentMapper( createStudentDto: CreateStudentDto): Promise<IUser> {

        const newStudent = new this.studentModel(createStudentDto);

        const newStudentData = new this.studentDataModel();

        newStudent.studentData = newStudentData;

        newStudent.role = 'student';
        
        newStudent.studentData.name = createStudentDto.name;
        newStudent.studentData.lastName = createStudentDto.lastName;
        newStudent.studentData.email = createStudentDto.email;
        newStudent.studentData.phone = createStudentDto.phone;
        newStudent.studentData.university = createStudentDto.university;
        newStudent.studentData.goal = createStudentDto.goal;
        newStudent.studentData.selfDescription = createStudentDto.selfDescription;
        newStudent.studentData.video = createStudentDto.video;

        const praxisVersion = await this.praxisService.getPraxisVersion(createStudentDto.university);

        newStudent.studentData.praxisVersion = praxisVersion;
        
        return newStudent;
    }
}

