import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    comment: string;
}