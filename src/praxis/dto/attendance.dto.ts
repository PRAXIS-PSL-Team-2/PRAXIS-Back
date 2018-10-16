import { ApiModelProperty } from "@nestjs/swagger";

export class StudentsAttendanceDto {

    @ApiModelProperty()
    readonly attendedStudentsId: [string];  

}