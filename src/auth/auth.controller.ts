import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { UsersService } from '../users/users.service';
import { Inject } from '@nestjs/common';
import { debug } from 'util';

@ApiUseTags('login')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService) {}
                
    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@Response() res, @Body() login: LoginUserDto){
        return await this.usersService.findOne({ username: login.username}).then(user => {
            if (!user) {
                return res.json({
                    message: 'User Not Found',
                });
            } else {

                const token = this.authService.createToken(user);

                return res.status(HttpStatus.OK).json(token);
            }
        });
    }

    @Get('check/token')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    public async checkToken(@Response() res){
        return res.json({
            status: true,
            code: HttpStatus.OK,
            message: "Token available."
        });
    }
}