import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignOptions, sign } from 'jsonwebtoken';
import { ConfigurationService } from '../configuration/configuration.service';
import { Configuration } from '../configuration/configuration.enum';
import { JwtPayload } from './jwt-payload';
import { StudentsService } from 'students/students.service';
import { Student } from 'students/interfaces/student.interface';



@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => StudentsService))
        readonly _studentService: StudentsService,
        private readonly _configurationService: ConfigurationService,
    ){
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = _configurationService.get(Configuration.JWT_KEY);
    }
    
    async signPayload(payload: JwtPayload): Promise<string>{
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: JwtPayload): Promise<Student>{
        return this._studentService.findOne({ usernam: payload.username.toLowerCase()});
    }
}
