import {forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginStatus } from 'src/user/dto/login-status.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user.service';
import { IAuthService } from '../interfaces/auth.interface';
import { JwtPayload } from '../jwt.strategy';

let jwt;

@Injectable()
export class AuthService implements IAuthService{
    constructor(
        
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        
        private readonly jwtService: JwtService,  
    ) {}

    public jwt : string;

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }


    
    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {  
          
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        jwt=token["accessToken"]
        this.jwt=jwt;

        return {
            login: user.login, token: token["accessToken"],    
        };  
    }
    
    private _createToken({ login }: UserDto): any {
        const user: JwtPayload = { login };    
        const accessToken = this.jwtService.sign({user});    
        return {
            expiresIn: process.env.JWT_SECRET,
            accessToken,    
        };  
    }


    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload["user"]["login"]); 
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }

}


export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}
