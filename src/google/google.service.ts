import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { getRepository, Repository } from 'typeorm';
import * as _ from 'lodash';
import { AuthService } from 'src/auth/services/auth.service';
 
@Injectable()
export class GoogleService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService : AuthService
    ){}

    async googleLogin(req) {

      console.log(req.user)
      try{
        if (!req.user) {
          throw new NotFoundException();
        }

        const obj = {
            email: req.user.email,
            login: req.user.firstName,
            password: 'google'
        }


        const resEmail = await this.userRepository.findOne({
          where: {
            login: obj.login,
            email: obj.email,
            password: obj.password
          }
        });

        if(resEmail){
          const {login, token} = await this.authService.login({login: obj.login, password: obj.password});   
          // const result = await this.authService.login(loginUserDto);  
          // this.jwt=token;
          return {login, token};
        }else {
          await this.authService.register(obj);
          const {login, token} = await this.authService.login({login: obj.login, password: obj.password}); 
          return {login, token};
        }

        // try{
        //   await this.authService.register(obj)
        // }catch (err){
        //   throw new HttpException('Registration Error', HttpStatus.CONFLICT)
        // }
        // try {
            
        //     const createdUser = await getRepository(User).create(obj);
        //     const result = await this.userRepository.save(createdUser);
        //     if(!result){
        //       throw new NotFoundException();
        //     }
        // }catch(err) {
        //    throw Error(err);
        // }
      }catch {
        throw new HttpException('Registration Error', HttpStatus.CONFLICT)
      }
    }       
}
