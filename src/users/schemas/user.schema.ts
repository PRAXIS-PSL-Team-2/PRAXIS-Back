import { Schema } from 'mongoose';
import { StudentSchema } from '../../students/schemas/student.schema';

export const UserSchema = new Schema(
    {
        username: {
            required: true,
            unique: true,
            type: String
        },
        password: {
            required: true,
            type: String
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'student', 'professor']
        },
        studentData: { 
            type: StudentSchema,
            required: () => { return this.role === 'student'; },
            default: null
        },
        professorData: { 
            type: StudentSchema,
            required: () => { return this.role === 'professor'; },
            default: null
        },
    }, 
    { 
        timestamps: true
    }
);