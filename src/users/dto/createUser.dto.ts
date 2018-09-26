import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly role: string;

}