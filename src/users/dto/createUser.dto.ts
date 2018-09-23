import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    readonly _id: number;

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly role: string;

}