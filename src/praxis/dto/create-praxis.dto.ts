import { ApiModelProperty } from "@nestjs/swagger";

export class CreateStudentDto {

    @ApiModelProperty()
    readonly versionName: string;
    
    @ApiModelProperty()
    readonly university: string;

    @ApiModelProperty()
    readonly openInscriptionDate: string;

    @ApiModelProperty()
    readonly closeInscriptionDate: string;

    @ApiModelProperty()
    readonly initialDate: string;

    @ApiModelProperty()
    readonly endDate: string;

    @ApiModelProperty()
    readonly virtualSessionLink: string;

    @ApiModelProperty()
    readonly studentsCapacity: number;

    @ApiModelProperty()
    readonly classDays: string;

    @ApiModelProperty()
    readonly classTimeRange: string;

}