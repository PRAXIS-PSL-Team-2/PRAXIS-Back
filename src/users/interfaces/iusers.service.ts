import { IUser } from './user.interface';

export interface IUsersService {
    findAll(): Promise<IUser[]>;
    findById(ID: number): Promise<IUser | null>;
    findByUsername(username: string): Promise<IUser | null>;
    findOne(options: object): Promise<IUser | null>;
    create(user: IUser): Promise<any | Error>;
    update(ID: number, newValue: IUser): Promise<IUser | null>;
    delete(ID: number): Promise<string>;
}