
import { RolesGuard } from './../auth/guards/roles.guard';
import { Controller, Get, Response, HttpStatus, Post, Body, HttpException, Param, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guards/roles.decorator';

@ApiUseTags('students')
@Controller('api/v1/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService){}

    // @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    @Get()
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard(), RolesGuard)
    // @Roles('student')
    public async getStudents(@Response() res) {
        const users = await this.studentsService.findAll();

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Students.', object: users});
        }
        
    }

    @Get('/username/disponibility/:username')
    public async checkIfUsernameExist(@Response() res, @Param('username') username: String) {
        const users = await this.studentsService.checkIfUsernameExist(username);

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json(users);
        }
    }

    @Get('/email/disponibility/:email')
    public async checkIfEmailExist(@Response() res, @Param('email') email: String) {
        const users = await this.studentsService.checkIfEmailExist(email);

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json(users);
        }
    }

    // @ApiOperation({ title: 'Create an user', description: "Create an user passing a object of type CreateUserDto. Return the object created" })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @Post()
    public async createStudent(@Response() res, @Body() createStudentDto: CreateStudentDto) {

        if(!createStudentDto.email || !createStudentDto.goal || !createStudentDto.lastName || !createStudentDto.name || !createStudentDto.password
            || !createStudentDto.phone || !createStudentDto.selfDescription || !createStudentDto.university || !createStudentDto.username || !createStudentDto.video ) {
                return res.json({ status: false, code: HttpStatus.CONFLICT, message: 'Missing fields to complete registration.'});
            }
        
        const user = await this.studentsService.create(createStudentDto);

        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The student has been successfully created.'});
        }
    }
}
