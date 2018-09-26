import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAdminDto {

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly password: string;

}