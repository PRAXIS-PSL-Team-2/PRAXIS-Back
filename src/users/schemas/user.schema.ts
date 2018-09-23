import { Schema } from 'mongoose';
import { StudentSchema } from '../../students/schemas/student.schema';
import { ProfessorSchema } from '../../professors/schemas/professor.schema';
import * as passportLocalMongoose from 'passport-local-mongoose';

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
            type: ProfessorSchema,
            required: () => { return this.role === 'professor'; },
            default: null
        },
    }, 
    { 
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose);