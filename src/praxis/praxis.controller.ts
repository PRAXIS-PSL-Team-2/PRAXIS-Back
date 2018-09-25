import { Controller, Get, Response, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PraxisService } from './praxis.service';
import { CreatePraxisDto } from './dto/create-praxis.dto';
import { UpdateAcceptedStudentsDto } from './dto/updateAcceptedStudents.dto';

@ApiUseTags('praxis')
@Controller('api/v1/praxis')
export class PraxisController {
    constructor(private readonly praxisService: PraxisService){}

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


    @ApiOperation({ title: 'Return an array of universities with open calls for praxis.' })
    @Get('/universities')
    public async getAvailablePraxis(@Response() res) {
        const praxis = await this.praxisService.getAvailablePraxis();
        return res.json(praxis);
    }

    @ApiOperation({ title: 'Return the Praxis id given the name of a university as long as there is an open call for that university.' })
    @Get('/praxis_version/:university')
    public async getPraxisVersion(@Response() res, @Param('university') university: String) {
        const praxis = await this.praxisService.getPraxisVersion(university);
        return res.json(praxis);
    }
    
    @ApiOperation({ title: 'Accepts a student to praxis. Add a candidate student to the list of students of a praxis.' })
    @Get('/:praxisId/accept/:studentId')
    public async acceptStudentInPraxis(@Response() res, @Param('studentId') studentId: String, @Param('praxisId') praxisId: String) {
        const praxis = await this.praxisService.acceptStudentInPraxis(studentId, praxisId);
        return res.json(praxis);
    }

    @ApiOperation({ title: 'Updates the list of accepted students given the id of a praxis and an array of candidates students id.' })
    @Post('/:praxisId/update_accepted')
    public async updateAcceptedStudents(@Response() res, @Body() updateAcceptedStudentsDto: UpdateAcceptedStudentsDto) {
        const praxis = await this.praxisService.updateAcceptedStudents(updateAcceptedStudentsDto);

        return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Students accepted.'});
    }

    @ApiOperation({ title: 'Get the candidates of a praxis given a Praxis id.' })
    @Get('/:praxisId/candidates')
    public async getCandidates(@Response() res, @Param('praxisId') praxisId: String) {
        
        const praxis = await this.praxisService.getCandidates(praxisId);

        return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Candidates of Praxis', object: praxis});
    }

    @ApiOperation({ title: 'Get the students of a praxis given a Praxis id.' })
    @Get('/:praxisId/students')
    public async getStudents(@Response() res, @Param('praxisId') praxisId: String) {
        
        const praxis = await this.praxisService.getStudents(praxisId);

        return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Students of Praxis', object: praxis});
    }
}
