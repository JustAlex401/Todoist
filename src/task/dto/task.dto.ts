import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Project } from "src/project/entity/project.entity";
import { UserProj } from "src/project/entity/userproject.entiry";

export class TaskDto {

    @ApiProperty({
        type: Number,
        required: true,
    })
    @IsNotEmpty() 
    @IsNumber()
    id: number;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        type: Boolean,
        required:false,
    })
    priority?: boolean;

    @ApiProperty({
        type: Date,
        required: true,
    })
    @IsNotEmpty()
    @IsDate()
    createAt: Date;

    @ApiProperty({
        type: Project,
        required: true,
    })
    @IsNotEmpty()
    project: Project;

}