import { Document } from 'mongoose';

export interface Praxis extends Document {
    versionName: string;
    university: string;
    openInscriptionDate: Date;
    closeInscriptionDate: Date;
    initialDate: Date;
    endDate: Date;
    virtualSessionLink: string;
    studentsCapacity: number;
    classDays: string;
    classTimeRange: string;
}