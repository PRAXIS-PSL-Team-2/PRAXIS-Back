import { Schema } from "mongoose";

export const ProfessorSchema = new Schema(
    {
        name: {
            required: true,
            type: String
        },
        lastName: {
            required: true,
            type: String
        },
        specialty: {
            required: true,
            type: String
        },
        selfDescription: {
            type: String
        },
    }, 
);