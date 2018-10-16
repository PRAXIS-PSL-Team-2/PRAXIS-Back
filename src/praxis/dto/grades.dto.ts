import { ApiModelProperty } from "@nestjs/swagger";


export class StudentGradeDto {
    @ApiModelProperty()
    readonly student: string;
    
    @ApiModelProperty()
    readonly grade: number;
}

export class StudentsGradesDto {


    @ApiModelProperty({ type: StudentGradeDto, isArray: true })
    readonly grades: StudentGradeDto[];

}



