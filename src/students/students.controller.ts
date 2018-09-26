
import { RolesGuard } from './../auth/guards/roles.guard';
import { Controller, Get, Response, HttpStatus, Post, Body, HttpException, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guards/roles.decorator';

@ApiUseTags('students')
@Controller('api/v1/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService){}

    @ApiOperation({ title: 'Get all students'})
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

    @ApiOperation({ title: 'Create a student'})
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

    @ApiOperation({ title: 'Update a student'})
    @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
    @Patch('/:studentId')
    public async updateStudent(@Response() res, @Param('studentId') id: String, @Body() createStudentDto: CreateStudentDto) {
    
        const user = await this.studentsService.update(id,createStudentDto);

        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The professor has been successfully updated.'});
        }
    }


    @ApiOperation({ title: 'Delete an student passing his _id.'})
    @Delete('/:studentId')
    public async deleteUser( @Param('studentId') id: String, @Response() res) {

        const user = await this.studentsService.delete(id);
        
        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.OK,  message: 'The professor has been successfully deleted.'});
        }
    }
}
