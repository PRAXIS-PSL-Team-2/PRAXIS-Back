import { ApiModelProperty } from "@nestjs/swagger";

export class UpdateAcceptedStudentsDto {

    @ApiModelProperty()
    readonly praxisId: string;

    @ApiModelProperty()
    readonly studentsId: [string];  

}