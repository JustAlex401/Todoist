import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsNumber, IsDate} from "class-validator";
import { User } from "src/user/entity/user.entity";

export class ProjectDto { 
    
    @ApiProperty({
        type: Number,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: Date,
    })
    @IsNotEmpty()
    @IsDate()
    createAt: Date;

    
}