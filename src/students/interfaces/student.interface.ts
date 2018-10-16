import { Document } from 'mongoose';

export interface StudentData extends Document {
    name: string;
    lastName: string;
    phone: string;
    university: string;
    praxisVersion: string;
    goal: string;
    selfDescription: string;
    video: string;
}
