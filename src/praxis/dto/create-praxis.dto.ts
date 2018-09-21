import { ApiModelProperty } from "@nestjs/swagger";

export class CreatePraxisDto {

    @ApiModelProperty()
    readonly versionName: string;
    
    @ApiModelProperty()
    readonly university: string;

    @ApiModelProperty()
    openInscriptionDate: string;

    @ApiModelProperty()
    closeInscriptionDate: string;

    @ApiModelProperty()
    initialDate: string;

    @ApiModelProperty()
    endDate: string;

    @ApiModelProperty()
    readonly virtualSessionLink: string;

    @ApiModelProperty()
    readonly studentsCapacity: number;

    @ApiModelProperty()
    readonly classDays: string;

    @ApiModelProperty()
    readonly classTimeRange: string;

}