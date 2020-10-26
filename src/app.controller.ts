import { Controller, Get, Response } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    start(@Response() res) {
      
        res.sendFile('index.html', {
            root: './client',
        });
  }
}
