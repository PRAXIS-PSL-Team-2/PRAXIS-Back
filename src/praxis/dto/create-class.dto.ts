import { ApiModelProperty } from "@nestjs/swagger";

export class CreateClassDto {

    @ApiModelProperty()
    readonly topic: string;
    
    @ApiModelProperty()
    readonly modality: string;

    @ApiModelProperty()
    readonly date: string;

    @ApiModelProperty()
    readonly hour: string;

    @ApiModelProperty()
    readonly professor: string;
}