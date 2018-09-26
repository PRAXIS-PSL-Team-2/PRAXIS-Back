import { Document } from 'mongoose';

export interface ProfessorData extends Document {
    name: string;
    lastName: string;
    email: string;
    specialty: string;
    selfDescription: string;
}