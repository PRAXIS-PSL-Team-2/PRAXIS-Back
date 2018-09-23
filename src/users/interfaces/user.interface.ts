import { Document, PassportLocalDocument } from 'mongoose';
import { StudentData } from '../../students/interfaces/student.interface';

export interface IUser extends PassportLocalDocument {
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly studentData: StudentData;
    readonly professorData: null;
}