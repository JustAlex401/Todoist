import { Controller, Post, Body, Res, HttpStatus, UseGuards, Req, Request, Get, Param, Put, Delete, Response, CACHE_MANAGER } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiParam, ApiResponse } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateProgDto } from '../dto/create-prog.dto';
import { UpdateProjDto } from '../dto/update-prog.dto';
import { ProjectService } from '../services/project.service';


@ApiBearerAuth()
@Controller('project')
export class ProjectController {

    constructor(
            private projService: ProjectService,
        ) { }

    @Post('/add')
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async createANote(@Res() res, @Body() createProgDto: CreateProgDto, @Req() req) {
        const user =req.user;
        const note = await this.projService.createProj(user,createProgDto);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Successful!",
            data: note
        })
    }

  
    @Get('/find/:name')
    @ApiParam({
        name: 'name',
        type: "string",
        description: "Project Name"
    })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async findProg(@Response() res, @Param('name') name: string, @Request() req) {
        const user = req.user;
        const note = await this.projService.findByProgName(user, name);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }


    @Get('/find/')
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async findAllProj(@Res() res, @Req() req) {
        const user = req.user;
        const note = await this.projService.getAllProject(user);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }


    @Put('/update/:name')
    @ApiParam({
        name: 'name',
        type: "string",
        description: "Project Name"
    })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async updateProj(@Res() res, @Req() req, @Param('name') name:string, @Body() updateProjDto: UpdateProjDto) {
        const user = req.user;
        const note = await this.projService.updateProj(user, updateProjDto, name);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }


    @Delete('/delete/:name')
    @ApiParam({
        name: 'name',
        type: "string",
        description: "Project Name"
    })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async deleteProj(@Res() res, @Req() req, @Param('name') name:string) {
        const user = req.user;
        const note = await this.projService.deleteProj(user, name);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }

}
