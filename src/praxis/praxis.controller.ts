import { Controller, Get, Response, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PraxisService } from './praxis.service';
import { CreatePraxisDto } from './dto/create-praxis.dto';
import { UpdateAcceptedStudentsDto } from './dto/updateAcceptedStudents.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { StudentsAttendanceDto } from './dto/attendance.dto';
import { StudentsGradesDto, StudentGradeDto } from './dto/grades.dto';
import { UpdateClassDto } from './dto/updateClass.dto';
import { HomeworkDto } from './dto/homework.dto';

@Controller('api/v1/praxis')
export class PraxisController {
    constructor(private readonly praxisService: PraxisService){}

    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Get all Praxis versions.'})
    @Get()
    public async getPraxis(@Response() res) {
        const praxis = await this.praxisService.findAll();

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Praxis.', object: praxis});
        }
        
    }

    // @ApiUseTags('praxis')
    // @ApiOperation({ title: 'Get Praxis given the id.'})
    // @Get('/:idPraxis')
    // public async getIdPraxis(@Response() res,  @Param('idPraxis') idPraxis: string) {
    //     const praxis = await this.praxisService.findById(idPraxis);

    //     if (praxis instanceof Error){
    //         return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
    //     } else {
    //         return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Praxis.', object: praxis});
    //     }
        
    // }
    
    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Create a Praxis version.', description: "Date format: MM/DD/YY" })
    @Post()
    public async createPraxis(@Response() res, @Body() createPraxisDto: CreatePraxisDto) {

        const praxis = await this.praxisService.create(createPraxisDto);

        
        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The Praxis Version has been successfully created.'});
        }
        
    }

    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Return an array of universities with open calls for praxis.' })
    @Get('/universities')
    public async getAvailablePraxis(@Response() res) {
        const praxis = await this.praxisService.getAvailablePraxis();
        return res.json(praxis);
    }

    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Return the Praxis id given the name of a university as long as there is an open call for that university.' })
    @Get('/praxis_version/:university')
    public async getPraxisVersion(@Response() res, @Param('university') university: String) {
        const praxis = await this.praxisService.getPraxisVersion(university);
        return res.json(praxis);
    }
    
    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Accepts a student to praxis. Add a candidate student to the list of students of a praxis.' })
    @Get('/:praxisId/accept/:studentId')
    public async acceptStudentInPraxis(@Response() res, @Param('studentId') studentId: string, @Param('praxisId') praxisId: String) {
        const praxis = await this.praxisService.acceptStudentInPraxis(studentId, praxisId);
        return res.json(praxis);
    }

    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Updates the list of accepted students given the id of a praxis and an array of candidates students id.' })
    @Post('/:praxisId/update_accepted_students')
    public async updateAcceptedStudents(@Response() res, @Body() updateAcceptedStudentsDto: UpdateAcceptedStudentsDto) {
        const praxis = await this.praxisService.updateAcceptedStudents(updateAcceptedStudentsDto);

        return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Students accepted.'});
    }

    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Get the candidates of a praxis given a Praxis id.' })
    @Get('/:praxisId/candidates')
    public async getCandidates(@Response() res, @Param('praxisId') praxisId: String) {
        
        const praxis = await this.praxisService.getCandidates(praxisId);

        return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Candidates of Praxis', object: praxis});
    }

    @ApiUseTags('praxis')
    @ApiOperation({ title: 'Get the students of a praxis given a Praxis id.' })
    @Get('/:praxisId/students')
    public async getStudents(@Response() res, @Param('praxisId') praxisId: String) {
        
        const praxis = await this.praxisService.getStudents(praxisId);

        return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Students of Praxis', object: praxis});
    }


    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    //////////////////// CLASSES ////////////////////////
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Create a Class for a specific praxis version.', description: "Date format: MM/DD/YY" })
    @Post('/:praxisId/class')
    public async createClass(@Response() res, @Body() createClassDto: CreateClassDto, @Param('praxisId') praxisId: string) {

        if( !createClassDto.topic ||  !createClassDto.modality ||  !createClassDto.date ||  !createClassDto.hour ||  !createClassDto.professor) {
            return res.json({ status: false, code: HttpStatus.CONFLICT, message: 'Missing fields to complete registration.'});
        }

        const praxis = await this.praxisService.createClass(praxisId, createClassDto);

        
        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The Class has been successfully created.'});
        }
        
    }

    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Get all classes for a specific praxis version.' })
    @Get('/:praxisId/classes')
    public async getClasses(@Response() res, @Param('praxisId') praxisId: string) {

        const praxis = await this.praxisService.getClasses(praxisId);

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Classes.', object: praxis});
        }
        
    }

    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Take assistance for a specific class in a praxis.' })
    @Post('/:praxisId/class/:classId/assistance')
    public async takeAssistance(@Response() res, @Param('praxisId') praxisId: string, @Param('classId') classId: string, @Body() studentsAttendanceDto: StudentsAttendanceDto) {

        const praxis = await this.praxisService.takeAssistance(praxisId, classId, studentsAttendanceDto);

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Classes.', object: praxis});
        }
        
    }

    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Update grades for a specific class in a praxis.'})
    @Post('/:praxisId/class/:classId/grades')
    public async putGrades(@Response() res, @Param('praxisId') praxisId: string, @Param('classId') classId: string, @Body() studentsGradesDto: StudentsGradesDto) {

        const praxis = await this.praxisService.putGrades(praxisId, classId, studentsGradesDto);

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Classes.', object: praxis});
        }
        
    }


    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Update some attr for a class.'})
    @Post('/:praxisId/class/:classId')
    public async updateClass(@Response() res, @Param('praxisId') praxisId: string, @Param('classId') classId: string, @Body() updateClassDto: UpdateClassDto) {

        const praxis = await this.praxisService.updateClass(praxisId, classId, updateClassDto);

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Classes.', object: praxis});
        }
        
    }

    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Upload a homework for a class.'})
    @Post('/:praxisId/class/:classId/homework/:studentId')
    public async uploadHomework(@Response() res, @Param('praxisId') praxisId: string, @Param('classId') classId: string, @Param('studentId') studentId: string, @Body() homeworkDto: HomeworkDto) {

        const praxis = await this.praxisService.uploadHomework(praxisId, classId, studentId, homeworkDto);

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Classes.', object: praxis});
        }
        
    }

    @ApiUseTags('classes') 
    @ApiOperation({ title: 'Get all homeworks for a class.'})
    @Get('/:praxisId/class/:classId/homeworks')
    public async getHomeworks(@Response() res, @Param('praxisId') praxisId: string, @Param('classId') classId: string) {

        const praxis = await this.praxisService.getHomeworks(praxisId, classId);

        if (praxis instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Homeworks.', object: praxis});
        }
        
    }

}
