import { Schema } from "mongoose";

export const ClassSchema = new Schema(
    {
        topic: {
            required: true,
            type: String
        },
        modality: {
            required: true,
            type: String
        },
        date: {
            required: true,
            type: Date
        },
        hour: {
            required: true,
            type: String
        },
        professor: {
            type: Schema.Types.ObjectId,
            ref: "User" 
        },
        resources: [
            {
                type: {
                    type: String,
                    required: true,
                    enum: ['file', 'link']
                },
                resource: {
                    type: String,
                    required: true
                }
            }
        ]
    }
);