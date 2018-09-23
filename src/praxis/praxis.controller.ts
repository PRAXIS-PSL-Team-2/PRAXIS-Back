import { Controller, Get, Response, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PraxisService } from './praxis.service';
import { CreatePraxisDto } from './dto/create-praxis.dto';

@ApiUseTags('praxis')
@Controller('api/v1/praxis')
export class PraxisController {
    constructor(private readonly praxisService: PraxisService){}

    // @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    @Get()
    public async getPraxis(@Response() res) {
        const praxis = await this.praxisService.findAll();


        if (praxis instanceof Error){
            return res.status(HttpStatus.CONFLICT).json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.status(HttpStatus.OK).json({ status: true, code: HttpStatus.CREATED,  message: 'Praxis.', object: praxis});
        }
        
    }
    

    @ApiOperation({ title: 'Create a Praxis version.', description: "Date format: MM/DD/YY" })
    // @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    public async createPraxis(@Response() res, @Body() createPraxisDto: CreatePraxisDto) {

        const praxis = await this.praxisService.create(createPraxisDto);

        
        if (praxis instanceof Error){
            return res.status(HttpStatus.CONFLICT).json({ status: false, code: HttpStatus.CONFLICT,  message: praxis.message});
        } else {
            return res.status(HttpStatus.CREATED).json({ status: true, code: HttpStatus.CREATED,  message: 'The Praxis Version has been successfully created.'});
        }
        
    }


    @Get('/universities')
    public async getAvailablePraxis(@Response() res) {
        const praxis = await this.praxisService.getAvailablePraxis();
        return res.status(HttpStatus.OK).json(praxis);
    }

    @Get('/praxis_version/:university')
    public async getPraxisVersion(@Response() res, @Param('university') university: String) {
        const praxis = await this.praxisService.getPraxisVersion(university);
        return res.status(HttpStatus.OK).json(praxis);
    }

    @Get('/:praxisId/accept/:studentId')
    public async acceptStudentInPraxis(@Response() res, @Param('studentId') studentId: String, @Param('praxisId') praxisId: String) {
        const praxis = await this.praxisService.acceptStudentInPraxis(studentId, praxisId);
        return res.status(HttpStatus.OK).json(praxis);
    }
}
