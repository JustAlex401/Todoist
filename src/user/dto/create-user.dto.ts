
import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {  

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
    })
    @IsNotEmpty() 
    @IsString() 
    login: string;

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
        minLength: 8,
    })
    @IsNotEmpty()  
    @IsString()
    password: string;
    
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()  
    @IsEmail(undefined, { message: 'Not a valid e-mail' })
    email: string;
}