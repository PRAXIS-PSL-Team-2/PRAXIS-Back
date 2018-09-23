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

    async findAll(): Promise<Praxis[]> {
        try {
            return await this.praxisModel.find().exec();
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create( createPraxisDto: CreatePraxisDto): Promise<Praxis> {
        try {
            const newPraxis = new this.praxisModel(createPraxisDto);

            return await newPraxis.save();
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
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

    async getPraxisVersion(universityy : String): Promise<string> {
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
                    { university:  universityy}
                ]
             }   
            }
        ])
        if (availablePraxis.length)     {
            return availablePraxis[0].praxisVersionId;
        }
        else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'That university does not have calls available for praxis at this time.',
            }, HttpStatus.NOT_FOUND);
        }
    }

}


