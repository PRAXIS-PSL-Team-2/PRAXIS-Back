import { Schema } from "mongoose";

export const ProfessorSchema = new Schema(
    {
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
    }, 
);