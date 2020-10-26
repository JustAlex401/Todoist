import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor (
        public authService:AuthService
    ){}
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
