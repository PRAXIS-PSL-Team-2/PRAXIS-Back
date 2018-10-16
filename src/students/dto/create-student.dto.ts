import { ApiModelProperty } from "@nestjs/swagger";

export class CreateStudentDto {

    @ApiModelProperty()
    readonly username: string;
    
    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly lastName: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly phone: string;

    @ApiModelProperty()
    readonly university: string;

    @ApiModelProperty()
    readonly goal: string;

    @ApiModelProperty()
    readonly selfDescription: string;

    @ApiModelProperty()
    readonly video: string;
}