import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AccessUserDto {

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
    })
    @IsNotEmpty()
    @IsString()
    nameUser: string;
    
}