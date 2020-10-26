import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
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

    
}