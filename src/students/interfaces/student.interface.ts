import { Document } from 'mongoose';

export interface Student extends Document {
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly name: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly university: string;
    readonly praxisVersion: string;
    readonly goal: string;
    readonly selfDescription: string;
    readonly video: string;
}