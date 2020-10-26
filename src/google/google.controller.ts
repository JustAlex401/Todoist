
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}


  // @Get('/logout')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthLogout(@Res() res){
  //   res.redirect('http://accounts.google.com/logout');
  // }

  
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {

    this.googleService.googleLogin(req);
    // res.json(result)
    res.sendFile('work.html', {
      root: './client',
    })
  }
}