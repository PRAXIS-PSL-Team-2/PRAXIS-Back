import { Injectable, Inject } from '@nestjs/common';
import { Student } from './interfaces/student.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentsService {
    // constructor(
    //     @Inject('User') private readonly userModel: Model<Student>
    // ) {}

    // async findAll(): Promise<Student[]> {
    //     return await this.userModel.find().exec();
    // }

    // async create( createUserDto: CreateUserDto): Promise<User> {
    //     const newUser = new this.userModel(createUserDto);
    //     return await newUser.save();
    // }
}
