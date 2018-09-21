import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Praxis, Class } from './interfaces/praxis.interface';
import { CreatePraxisDto } from './dto/create-praxis.dto';

@Injectable()
export class PraxisService {
    constructor(
        @InjectModel('Praxis') private readonly praxisModel: Model<Praxis>,
        @InjectModel('Praxis') private readonly classModel: Model<Class>,
    ) {}

    async findAll(): Promise<Praxis[]> {
        return await this.praxisModel.find().exec();
    }

    async create( createPraxisDto: CreatePraxisDto): Promise<Praxis> {
        const newPraxis = new this.praxisModel(createPraxisDto);

        return await newPraxis.save();
    }
}
