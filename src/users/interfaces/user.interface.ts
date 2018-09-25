import { Document, PassportLocalDocument } from 'mongoose';
import { StudentData } from '../../students/interfaces/student.interface';

export interface IUser extends PassportLocalDocument {
    readonly username: string;
    readonly password: string;
    role: string;
    studentData: StudentData;
    professorData: null;
}