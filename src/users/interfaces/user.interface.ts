import { Document, PassportLocalDocument } from 'mongoose';
import { ProfessorData } from './../../professors/interfaces/professor.interface';
import { StudentData } from '../../students/interfaces/student.interface';

export interface IUser extends PassportLocalDocument {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    role: string;
    studentData: StudentData;
    professorData: ProfessorData;
}