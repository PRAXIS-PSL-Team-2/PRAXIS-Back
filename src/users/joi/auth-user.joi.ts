import { object, string, ObjectSchema } from 'joi';

export const authUserSchema: ObjectSchema = object({
    username: string().required(),
    password: string().min(6).max(36).required(),
});