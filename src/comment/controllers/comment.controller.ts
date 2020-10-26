import { Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateCommentDto } from '../dto/create.dto';
import { Commentsss } from '../entity/comment.entity';
import { CommentService } from '../services/comment.service';

@ApiBearerAuth()
@Controller('comment')
export class CommentController {

    constructor(
        readonly comments : CommentService,
    ){}


@Post('/add/:nameP/:nameT')
    @ApiParam({
        name: 'nameP',
        type: "string",
        description: "Project Name"
    })
    @ApiParam({
        name: 'nameT',
        type: "string",
        description: "Task Name"
    })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async createANote(@Res() res,@Req() req,@Param('nameT') nameT:string, @Param('nameP') nameP:string, @Body() createCommentDto: CreateCommentDto) {
        const user =req.user;
        const note = await this.comments.createCom(user,nameT, nameP, createCommentDto);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Successful!",
            data: note
        })
    }

}
