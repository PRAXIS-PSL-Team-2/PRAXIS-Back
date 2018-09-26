import { Controller, Response, HttpStatus, Post, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateProfessorDto } from './dto/create-professor.dto';

@ApiUseTags('professors')
@Controller('api/v1/professors')
export class ProfessorsController {
    constructor(private readonly professorsService: ProfessorsService){}

    @ApiOperation({ title: 'Get all professors' })
    @Get()
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard(), RolesGuard)
    // @Roles('student')
    public async getProfessors(@Response() res) {
        const users = await this.professorsService.findAll();

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Professors.', object: users});
        }
        
    }

    @ApiOperation({ title: 'Get one Professor.'})
    @Get('/:professorId')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard())
    // @Roles('student')
    public async getProfessor(@Response() res, @Param('professorId') id: String) {
        const users = await this.professorsService.findById(id);

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'Professor.', object: users});
        }
        
    }

    @ApiOperation({ title: 'Create a professor'})
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @Post()
    public async createStudent(@Response() res, @Body() createProfessorDto: CreateProfessorDto) {

        if(!createProfessorDto.email || !createProfessorDto.lastName || !createProfessorDto.name || !createProfessorDto.password
            ||  !createProfessorDto.selfDescription || !createProfessorDto.username  ) {
                return res.json({ status: false, code: HttpStatus.CONFLICT, message: 'Missing fields to complete registration.'});
            }
        
        const user = await this.professorsService.create(createProfessorDto);

        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The professor has been successfully created.'});
        }
    }

    @ApiOperation({ title: 'Update a professor'})
    @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
    @Patch('/:professorId')
    public async updateProfessor(@Response() res, @Param('professorId') id: String, @Body() createProfessorDto: CreateProfessorDto) {
    
        const user = await this.professorsService.update(id,createProfessorDto);

        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The professor has been successfully updated.'});
        }
    }


    @ApiOperation({ title: 'Delete an professor passing his _id.' })
    @Delete('/:professorId')
    public async deleteUser( @Param('professorId') id: String, @Response() res) {

        const user = await this.professorsService.delete(id);
        
        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.OK,  message: 'The professor has been successfully deleted.'});
        }
    }
}
