import { Schema } from 'mongoose';

export const StudentSchema = new Schema(
    {
        name: {
            required: true,
            type: String
        },
        lastName: {
            required: true,
            type: String
        },
        phone: {
            required: true,
            type: String
        },
        university: {
            required: true,
            type: String
        },
        praxisVersion: {
            required: true,
            type: Schema.Types.ObjectId
        },
        goal: {
            type: String,
            required: true,
            enum: ['intership', 'firstjob']
        },
        selfDescription: {
            required: true,
            type: String
        },
        video: {
            required: true,
            type: String
        },
        status: {
            required: true,
            type: String,
            enum: ['candidate', 'accepted'],
            default: 'candidate'
        },
        team: {
            type: Number
        },
        classes: [ 
            {
                class_id: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                attendance: {
                    type: String,
                    enum: ['','yes','no'],
                    default: ''
                },
                grade: {
                    type: Number,
                    default: null
                }
            },
        ]
    }
);