import { Document } from 'mongoose';

export interface ProfessorData extends Document {
    name: string;
    lastName: string;
    specialty: string;
    selfDescription: string;
}