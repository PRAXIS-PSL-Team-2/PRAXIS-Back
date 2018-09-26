import { Injectable, HttpStatus, HttpException, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PassportLocalModel } from 'mongoose';
import { Praxis } from './interfaces/praxis.interface';
import { CreatePraxisDto } from './dto/create-praxis.dto';
import { StudentsService } from './../students/students.service';
import { ModuleRef } from '@nestjs/core';
import { UpdateAcceptedStudentsDto } from './dto/updateAcceptedStudents.dto';
import { IUser } from '../users/interfaces/user.interface';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './interfaces/class.interface';
import * as mongoose from 'mongoose';
import { StudentsAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class PraxisService implements OnModuleInit {

    private studentsService: StudentsService;

    constructor(
        @InjectModel('User') private readonly studentModel: PassportLocalModel<IUser>,
        @InjectModel('Praxis') private readonly praxisModel: Model<Praxis>,
        @InjectModel('Class') private readonly classModel: Model<Class>,
        private readonly moduleRef: ModuleRef,
    ) {}

    onModuleInit() {
        this.studentsService = this.moduleRef.get(StudentsService);
    }

    async findAll(): Promise<Praxis[] | Error> {
        try {
            return await this.praxisModel.find().exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async findById(praxisID :string): Promise<Praxis> {
        try {
            return await this.praxisModel.findById(praxisID).exec();
        } catch (e) {
            throw new HttpException({
                status: false,
                code: HttpStatus.CONFLICT,
                error: String(e),
            }, HttpStatus.CONFLICT);
        }
    }

    async create( createPraxisDto: CreatePraxisDto): Promise<Praxis | Error> {
        try {
            const newPraxis = new this.praxisModel(createPraxisDto);

            return await newPraxis.save();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async update(ID: String, newValue: any): Promise<Praxis | Error> {
        const praxis = await this.praxisModel.findById(ID).exec();

        if (!praxis._id) {
            const error = new Error()
            error.message = 'Praxis not found.';
            return error;
        }

        try {
            await this.praxisModel.findByIdAndUpdate(ID, newValue).exec();

            return await this.praxisModel.findById(ID).exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }

    }

    async getAvailablePraxis(): Promise<Praxis[]>{

        return await this.praxisModel.find({
            $and: [
                { openInscriptionDate: { $lt: new Date() } },
                { closeInscriptionDate: { $gte: new Date() } },
            ]
        }).distinct("university").exec();

    }

    async getPraxisVersion(university : String): Promise<any> {
        const  availablePraxis  = await this.praxisModel.aggregate([
            { $project: {
                _id: 0, 
                "praxisVersionId": "$_id",
                university: 1,
                openInscriptionDate: 1,
                closeInscriptionDate: 1
             }
            },
            { $match : {
                $and: [
                    { openInscriptionDate: { $lt: new Date() } },
                    { closeInscriptionDate: { $gte: new Date() } },
                    { university:  university}
                ]
             }   
            }
        ])
        if (availablePraxis.length)     {
            return availablePraxis[0].praxisVersionId;
        }
        else {
            return {
                status: false,
                code: HttpStatus.NOT_FOUND,
                message: 'That university does not have calls available for praxis at this time.'
            };
        }
    }

    async setStudentCandidateToPraxis(studentId: String, praxisId: String) {

        const body = {$addToSet: { candidates: studentId }};

        await this.update(praxisId, body);
        
    }

    async acceptStudentInPraxis(studentId: String, praxisId: String) {     
        try {
            const result = await this.praxisModel.find({
                _id: praxisId,
                candidates: {$in: studentId}
            });  
            
            if (result.length == 0) {
                return {
                    status: false,
                    code: HttpStatus.NOT_FOUND,
                    message: 'The student is not a candidate for that version of praxis.'
                };
            }
    
            await this.studentsService.changeStatusToAccepted(studentId);
    
            const body = {$addToSet: { students: studentId }};
    
            return this.update(praxisId, body);

        } catch (error) {
            throw new HttpException({
                status: false,
                code: HttpStatus.CONFLICT,
                error: String(error),
            }, HttpStatus.CONFLICT);
        }
    }

    async updateAcceptedStudents(updateAcceptedStudentsDto: UpdateAcceptedStudentsDto) {

        try {

            const result = await this.praxisModel.find({
                _id: updateAcceptedStudentsDto.praxisId,
                candidates: {$all: updateAcceptedStudentsDto.studentsId}
            });  
            
            if (result.length == 0) {
                return {
                    status: false,
                    code: HttpStatus.NOT_FOUND,
                    message: 'Some student is not a candidate for that version of praxis.'
                };
            }

            const body = {$addToSet: { students: updateAcceptedStudentsDto.studentsId }};

            await this.update(updateAcceptedStudentsDto.praxisId, body);    
        } catch (error) {

            throw new HttpException({
                status: false,
                code: HttpStatus.CONFLICT,
                error: String(error),
            }, HttpStatus.CONFLICT);
            
        }  
    }

    async getCandidates(praxisId: String) {    
        let result;
        
        try {
            result = await this.praxisModel.findOne({
                _id: praxisId,
            },'candidates -_id').populate('candidates');  
        } catch(error){
            throw new HttpException({
                status: false,
                code:HttpStatus.CONFLICT,
                error: String(error)
            }, HttpStatus.CONFLICT);
        }
        
        if (result['candidates'].length == 0) {
            throw new HttpException({
                status: false,
                code:HttpStatus.NOT_FOUND,
                error: 'This PRAXIS has no candidates.'
            }, HttpStatus.NOT_FOUND);
        }

        return result;

    }

    async getStudents(praxisId: String) {     
        let result;
        
        try {
            result = await this.praxisModel.findOne({
                _id: praxisId,
            },'students -_id').populate('students');  
        } catch(error){
            throw new HttpException({
                status: false,
                code:HttpStatus.CONFLICT,
                error: String(error)
            }, HttpStatus.CONFLICT);
        }
        
        if ( result['students'].length == 0) {

            throw new HttpException({
                status: false,
                code:HttpStatus.NOT_FOUND,
                error: 'This PRAXIS has no students.'
            }, HttpStatus.NOT_FOUND);
        }

        return result;
    }



    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    //////////////////// CLASSES ////////////////////////
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    async createClass( praxisId: string, createClassDto: CreateClassDto): Promise<Praxis | Error> {

        const praxis = await this.findById(praxisId);

        if (!praxis._id) {
            throw new HttpException({
                status: false,
                code: HttpStatus.CONFLICT,
                error: 'Praxis not found.',
            }, HttpStatus.CONFLICT);
        }

        const newClass = new this.classModel(createClassDto);

        const body = {$push: { schedule: newClass }}

        try {
            await this.update(praxisId, body);
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
        }
    }

    async getClasses( praxisId: string ): Promise<any | Error> {

        const praxis = mongoose.Types.ObjectId(praxisId)

        const classes = this.praxisModel.aggregate([
            {
                $match: { "_id": praxis}
            },
            { $unwind: "$schedule" },
           {
            $lookup:
              {
                from: "users",
                localField: "schedule.professor",
                foreignField: "_id",
                as: "professor"
              }
         },
           {$project: {
                classId: "$schedule._id",
                topic: "$schedule.topic",
                modality: "$schedule.modality",
                date: "$schedule.date",
                hour: "$schedule.hour",
                professor: {
                    $let : {
                        vars: { "professor": { $arrayElemAt: [ "$professor", 0 ] } },
                        in: {
                            name: "$$professor.professorData.name",
                            lastName: "$$professor.professorData.lastName",
                            email: "$$professor.email",
                            specialty: "$$professor.professorData.specialty",
                            selfDescription: "$$professor.professorData.selfDescription",
                        }
                    }
                },
                resources: "$schedule.resources",
           }
        },
         ])

        if (classes == null) {
            throw new HttpException({
                status: false,
                code: HttpStatus.CONFLICT,
                error: 'Praxis not found.',
            }, HttpStatus.CONFLICT);
        }

        return classes

    }

    async takeAssistance(praxisId: string, classId: string, studentsAttendanceDto: StudentsAttendanceDto) {

        const praxis = await this.praxisModel.findOne({
            _id: praxisId,
            schedule: {$elemMatch: { "_id": classId}}
        });

        if (praxis == null) {
            throw new HttpException({
                status: false,
                code: HttpStatus.CONFLICT,
                error: 'Praxis not found or class dont belong to that Praxis.',
            }, HttpStatus.CONFLICT);
        }
        const attendedStudents = studentsAttendanceDto.attendedStudentsId;
        const praxisStudents = praxis["students"]

        praxisStudents.forEach(async student => {
            const current = await this.studentModel.findOne({
                _id: student,
                "studentData.classes.class_id": classId
            })

            if (current == null){

                const classData = {
                    "class_id": classId,
                    "attendance": attendedStudents.includes(String(student))
                }
                const body = {$addToSet: { "studentData.classes": classData }}

                this.studentsService.update(student, body)
            } else{

                console.log(attendedStudents.includes(String(student)));

                console.log(

                    await this.studentModel.findOne({
                        _id: student,
                        studentData:  { classes:  {$elemMatch: {"class_id": classId }}}
                    })
                // await this.studentModel.updateOne({
                //     _id: student,
                //     "studentData.classes.class_id":  classId 
                // }, { $set: { "studentData.classes.$.attendance": attendedStudents.includes(String(student)) }})

                );
            }

        });

        return praxis
    }

}



