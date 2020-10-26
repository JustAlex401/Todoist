import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskDto {

    @ApiProperty({
        type: String,
        maxLength : 20,
    })
    @IsNotEmpty()
    @IsString()
    name?: string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    description?: string;

    @ApiProperty({
        type: Boolean,
        required:false,
    })
    priority?: boolean;

}