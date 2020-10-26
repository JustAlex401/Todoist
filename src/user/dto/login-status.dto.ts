import { ApiProperty } from '@nestjs/swagger';
import {IsString } from 'class-validator';

import { IsNotEmpty, IsEmail} from "class-validator";

export class LoginStatus {  

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
    })
    @IsString()
    @IsNotEmpty() 
    login: string;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty() 
    token: string;
}