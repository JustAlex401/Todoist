import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create.tdo';
import { TaskService } from '../services/task.service';

@ApiBearerAuth()
@Controller('task')
export class TaskController {

    constructor(
        readonly taskService : TaskService,
    ){}

    @Post('/add/:nameP')
    @ApiParam({
        name: 'nameP',
        type: "string",
        description: "Project Name"
    })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async createANote(@Res() res,@Req() req,@Param('nameP') nameP:string, @Body() createTaskDto: CreateTaskDto) {
        const user =req.user;
        const note = await this.taskService.createTask(user,createTaskDto, nameP);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Successful!",
            data: note
        })
    }


    @Get('/find/:nameP/:nameT')
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
    async findProg(@Res() res, @Param('nameP') nameP:string, @Param('nameT') nameT:string, @Req() req) {
        const user = req.user;
        const note = await this.taskService.findByTaskName(user, nameP, nameT);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }



    @Get('/find/:nameP')
    @ApiParam({
        name: 'nameP',
        type: "string",
        description: "Project Name"
    })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    async findProj(@Res() res, @Param('nameP') nameP:string, @Req() req) {
        const user = req.user;
        const note = await this.taskService.getAllTasks(user, nameP);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }



    @Put('/update/:nameP/:nameT')
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
    async updateProj(@Res() res, @Param('nameP') nameP:string,  @Param('nameT') nameT:string, @Body() createTaskDto: CreateTaskDto, @Req() req) {
        const user = req.user;
        const note = await this.taskService.updateTask(user, createTaskDto, nameP, nameT);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }



    @Delete('/delete/:nameP/:nameT')
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
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    @UseGuards(AuthGuard())  
    async deleteProj(@Res() res, @Param('nameP') nameP:string,  @Param('nameT') nameT:string, @Req() req) {
        const user = req.user;
        console.log(user)
        const note = await this.taskService.deleteTask(user, nameP, nameT);
        res.status(HttpStatus.OK).json({
            status: 200,
            message: "Successful!",
            data: note
        })
    }


}
