import { IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {  

    @ApiProperty({
        type: String,
        required: true,
        maxLength: 20
    })
    @IsString()
    @IsNotEmpty()  
    readonly login: string;

    @ApiProperty({
        type: String,
        required: true,
        maxLength: 20,
        minLength: 8
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}