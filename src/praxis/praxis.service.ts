import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Praxis, Class } from './interfaces/praxis.interface';
import { CreatePraxisDto } from './dto/create-praxis.dto';

@Injectable()
export class PraxisService {
    constructor(
        @InjectModel('Praxis') private readonly praxisModel: Model<Praxis>,
        @InjectModel('Praxis') private readonly classModel: Model<Class>
    ) {}

    async findAll(): Promise<Praxis[] | Error> {
        try {
            return await this.praxisModel.find().exec();
        } catch (e) {
            const error = new Error()
            error.message = String(e);
            return error;
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
        const user = await this.praxisModel.findById(ID).exec();

        if (!user._id) {
            const error = new Error()
            error.message = 'User not found.';
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
        const result = await this.praxisModel.find({
            _id: praxisId,
            candidates: {$in: studentId}
        });

        if (result.length == 0) {
            return {
                status: false,
                code: HttpStatus.NOT_FOUND,
                message: 'The student is not a candidate for that version of praxis.That university does not have calls available for praxis at this time.'
            };
        }

        const body = {$addToSet: { students: studentId }};

        return this.update(praxisId, body);
    }

}


