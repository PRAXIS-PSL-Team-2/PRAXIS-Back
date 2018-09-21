import { Controller, Get, Response, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PraxisService } from './praxis.service';
import { CreatePraxisDto } from './dto/create-praxis.dto';

@ApiUseTags('praxis')
@Controller('api/v1/praxis')
export class PraxisController {
    constructor(private readonly praxisService: PraxisService){}

    // @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    @Get()
    public async getStudents(@Response() res) {
        const praxis = await this.praxisService.findAll();
        return res.status(HttpStatus.OK).json(praxis);
    }

    @ApiOperation({ title: 'Create a Praxis version.', description: "Date format: MM/DD/YY" })
    // @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    public async createStudent(@Response() res, @Body() createPraxisDto: CreatePraxisDto) {

        const praxis = await this.praxisService.create(createPraxisDto);

        return res.status(HttpStatus.CREATED).json(praxis);
    }
}
