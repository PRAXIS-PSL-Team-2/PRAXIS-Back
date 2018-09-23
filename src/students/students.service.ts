import { Injectable, Inject, forwardRef, HttpException, HttpStatus, Next } from '@nestjs/common';
import { Student, StudentData } from './interfaces/student.interface';
import { Model, Types, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { PraxisService } from '../praxis/praxis.service';



@Injectable()
export class StudentsService {
    constructor(
        @InjectModel('User') private readonly studentModel: Model<Student>,
        @InjectModel('User') private readonly studentDataModel: Model<StudentData>,
        private readonly praxisService: PraxisService
    ) {}

    async findAll(): Promise<Student[] | Error> {
        try {
            return await this.studentModel.find().exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async create( createStudentDto: CreateStudentDto): Promise<Student | Error> {

        try {
            const newStudent = await this.studentMapper(createStudentDto);
            const student = await newStudent.save();
            await this.praxisService.setStudentCandidateToPraxis(student._id, student.studentData.praxisVersion);
            return student
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }

    async checkIfUsernameExist( input: String): Promise<Boolean | Error> {

        try {
            const result = await this.studentModel.find({username: input}).exec();
            return (result.length == 0);
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }

    async checkIfEmailExist( input: String): Promise<Boolean | Error> {

        try {
            const result = await this.studentModel.find({"studentData.email" : input}).exec();
            return (result.length == 0);
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }
    
    async studentMapper( createStudentDto: CreateStudentDto): Promise<Student> {

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

