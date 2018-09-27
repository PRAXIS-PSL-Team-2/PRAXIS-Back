import { ApiModelProperty } from "@nestjs/swagger";

export class HomeworkDto {

    @ApiModelProperty()
    readonly type: string;

    @ApiModelProperty()
    readonly homework: string;
    
}