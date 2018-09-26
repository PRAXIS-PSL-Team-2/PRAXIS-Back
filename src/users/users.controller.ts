import { Controller, Post, Response, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateAdminDto } from './dto/createAdmin.dto';

@ApiUseTags('users')
@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    

    @ApiOperation({ title: 'Create a user (admin)'})
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @Post()
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard(), RolesGuard)
    // @Roles('admin')
    public async createUser(@Response() res, @Body() createUserDto: CreateAdminDto) {

        if( !createUserDto.password ||  !createUserDto.username ) {
                return res.json({ status: false, code: HttpStatus.CONFLICT, message: 'Missing fields to complete registration.'});
            }
        
        const user = await this.usersService.create(createUserDto);

        if (user instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: user.message});
        } else {
            return res.json({ status: true, code: HttpStatus.CREATED,  message: 'The admin user has been successfully created.'});
        }
    }

    @ApiOperation({ title: 'Return TRUE if an username is available'})
    @Get('/username/disponibility/:username')
    public async checkIfUsernameExist(@Response() res, @Param('username') username: String) {
        const users = await this.usersService.checkIfUsernameExist(username);

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json(users);
        }
    }

    @ApiOperation({ title: 'Return TRUE if an email is available'})
    @Get('/email/disponibility/:email')
    public async checkIfEmailExist(@Response() res, @Param('email') email: String) {
        const users = await this.usersService.checkIfEmailExist(email);

        if (users instanceof Error){
            return res.json({ status: false, code: HttpStatus.CONFLICT,  message: users.message});
        } else {
            return res.json(users);
        }
    }
}
