import { Schema } from 'mongoose';
import { ClassSchema } from './class.schema';

export const PraxisSchema = new Schema(
    {
        versionName: {
            required: true,
            type: String
        },
        university: {
            required: true,
            type: String
        },
        openInscriptionDate: {
            required: true,
            type: Date
        },
        closeInscriptionDate: {
            required: true,
            type: Date
        },
        initialDate: {
            required: true,
            type: Date
        },
        endDate: {
            type: Date,
            required: true,
        },
        virtualSessionLink: {
            type: String
        },
        surveyLink: {
            type: String
        },
        studentsCapacity: {
            type: Number
        },
        classDays: {
            type: String
        },
        classTimeRange: {
            type: String
        },
        candidates: [{
            type: Schema.Types.ObjectId,
            ref: "User" 
        }],
        students: [{
            type: Schema.Types.ObjectId,
            ref: "User" 
        }],
        schedule: {
            type : [ClassSchema]
        }
    }
);

