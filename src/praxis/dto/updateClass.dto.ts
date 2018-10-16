import { ApiModelProperty } from "@nestjs/swagger";


export class ResourceDto {
    @ApiModelProperty()
    readonly type: string;
    
    @ApiModelProperty()
    readonly resource: string;
}

export class UpdateClassDto {

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly homework: string;
    
    @ApiModelProperty({ type: ResourceDto })
    readonly resource: ResourceDto;
    
}
