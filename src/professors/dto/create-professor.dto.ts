import { ApiModelProperty } from "@nestjs/swagger";

export class CreateProfessorDto {

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
    readonly specialty: string;

    @ApiModelProperty()
    readonly selfDescription: string;

}