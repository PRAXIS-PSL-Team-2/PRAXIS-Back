import { Document } from 'mongoose';

export interface Class extends Document {
    topic: string;
    modality: string;
    date: Date;
    hour: string;
    professor: string;
}