import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class UpdateProjDto {

    @ApiProperty({
        type: String,
        maxLength : 20,
    })
    @IsNotEmpty()
    @IsString()
    name?: string;
    
}