import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {  

    @ApiProperty({
        type: Number,
        required: true,
        maxLength: 20,
        minLength: 8
    })
    @IsNotEmpty() 
    @IsString()
    id: number;

    @ApiProperty({
        type: String,
        required: true,
        maxLength: 20,
        minLength: 8
    })
    @IsNotEmpty()  
    @IsString()
    login: string;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty() 
    @IsEmail()  
    email: string;
}