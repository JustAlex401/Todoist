import { Body, Controller, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {}
