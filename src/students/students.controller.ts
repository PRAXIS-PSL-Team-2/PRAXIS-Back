import { Controller, Get, Response, HttpStatus, Post, Body, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@ApiUseTags('students')
@Controller('api/v1/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService){}

    // @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    @Get()
    public async getStudents(@Response() res) {
        const users = await this.studentsService.findAll();

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Students.', object: users});
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
