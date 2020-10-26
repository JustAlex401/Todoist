import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class CreateProgDto {

    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    
    
}