import { Document, Types } from 'mongoose';

export interface StudentData extends Document {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    university: string;
    praxisVersion: string;
    goal: string;
    selfDescription: string;
    video: string;
}

export interface Student extends Document {
    readonly username: string;
    readonly password: string;
    role: string;
    studentData: StudentData;
    readonly professorData: null;
}