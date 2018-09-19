import { Controller, Get, Response, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@ApiUseTags('students')
@Controller('api/v1/students')
export class StudentsController {
    // constructor(private readonly studentsService: StudentsService){}

    // // @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    // @Get()
    // public async getStudents(@Response() res) {
    //     const users = await this.studentsService.findAll();
    //     return res.status(HttpStatus.OK).json(users);
    // }

    // // @ApiOperation({ title: 'Create an user', description: "Create an user passing a object of type CreateUserDto. Return the object created" })
    // // @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    // // @ApiResponse({ status: 403, description: 'Forbidden.' })
    // @Post()
    // public async createStudent(@Response() res, @Body() createStudentDto: CreateStudentDto) {

    //     const user = await this.studentsService.create(createStudentDto);
    //     return res.status(HttpStatus.CREATED).json(user);
    // }
}
