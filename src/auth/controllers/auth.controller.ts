import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Req, Res, Response, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { request } from 'express';
import { AccessUserDto } from 'src/user/dto/access-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/services/user.service';
import { AuthService, RegistrationStatus } from '../services/auth.service';


@Controller('auth')
export class AuthController {

    

    constructor(
            private readonly authService: AuthService,
            private readonly userService:UserService
            // @Inject(CACHE_MANAGER) private cacheManager
        ) {}

    @Get('/reg')
    public async reg(@Response() res){
        res.sendFile('registration.html', {
            root:'./client',
        })
    }

    @Post('register')
    @ApiBody({type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'CREATED' })
    public async register(@Response() res, @Body() createUserDto: CreateUserDto) {    
        const result: RegistrationStatus = await this.authService.register(createUserDto);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
        }
        res.status(HttpStatus.CREATED).json(result);
    }


    @Get('/log/')
    public async log(@Response() res){
        res.sendFile('login.html', {
            root:'./client',
        })
    }

    @Post('login')  
    @ApiBody({type: LoginUserDto })
    @ApiResponse({ status: 200, description: 'OK' })
    public async login(@Response() res,@Body() loginUserDto: LoginUserDto){
        const {login, token} = await this.authService.login(loginUserDto);   
        res.status(HttpStatus.OK).json({login, token});
    }


    // @Get('user/:token')
    // public async aaa(@Response() res,@Body() loginUserDto: LoginUserDto,@Param() par,){
    //     const token = par.token;
    //     console.log(token)
    //     res.sendFile('work.html', {
    //         root:'./client',
    //     })
    // }


    @ApiBearerAuth()
    @Post('/access/:name')
    @ApiParam({
        name: 'name',
        type: "string",
        description: "Project Name"
    })
    @ApiBody({type: AccessUserDto })
    @UseGuards(AuthGuard())  
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    @ApiResponse({ status: 201, description: 'Created' })
    public async addAccessToProject(@Req() req, @Res() res, @Param('name') name:string,@Body() accessUserDto:AccessUserDto ){
        const user =req.user;
        const note = await this.userService.addAccessUser(user, accessUserDto.nameUser ,name);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Successful!",
            data: note
        })
    }

    
}
