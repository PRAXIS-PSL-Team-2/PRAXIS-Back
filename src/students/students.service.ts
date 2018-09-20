import { Injectable, Inject } from '@nestjs/common';
import { Student, StudentData } from './interfaces/student.interface';
import { Model, Types, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel('User') private readonly studentModel: Model<Student>,
        @InjectModel('User') private readonly studentDataModel: Model<StudentData>
    ) {}

    async findAll(): Promise<Student[]> {
        return await this.studentModel.find().exec();
    }

    async create( createStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = this.studentMapper(createStudentDto, "Praxis Version ID");

        return await newStudent.save();
    }

    
    studentMapper( createStudentDto: CreateStudentDto, praxisVersion: String  ): Student {

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
        newStudent.studentData.praxisVersion = newStudent._id;

        return newStudent;
    }
}

