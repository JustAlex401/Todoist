import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/mapper';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ProjectDto } from 'src/project/dto/project.dto';
import { UserProj } from 'src/project/entity/userproject.entiry';
import { Project } from 'src/project/entity/project.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IUserService } from '../interfaces/user.interface';

@ApiBearerAuth()
@Injectable()
export class UserService implements IUserService{

  constructor(
    @InjectRepository(User)    
    private readonly userRepo: Repository<User>, 
    @InjectRepository(UserProj)    
    private readonly userProjRepo: Repository<UserProj>,
    ) {}


    async findOne(options?: object): Promise<UserDto> {
      const user =  await this.userRepo.findOne(options);    
      if(!user){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return toUserDto(user);  
    }



  async findByLogin({ login, password }: LoginUserDto): Promise<UserDto> {  
    const user = await this.userRepo.findOne({ where: { login } });
    if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);    
    }
    
    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }
    
    return toUserDto(user);  
}


  async findByPayload(login : string): Promise<UserDto> {

    const user = await this.userRepo.findOne({ 
      where:  { login } 
    });
    if(!user){
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND); 
    }
    return await this.userRepo.findOne({ 
        where:  { login } 
      });  
  }


  async create(userDto: CreateUserDto): Promise<UserDto> { 
    
    if(!this.validateEmail(userDto.email)){
      throw new HttpException('Uncorrect email !', HttpStatus.BAD_REQUEST);
    }



    const { login, password, email } = userDto;
    
    const userInDb = await this.userRepo.findOne({ 
        where: { login } 
    });
    if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
    }
    
    const user: User = await this.userRepo.create({ login, password, email});
    await this.userRepo.save(user);
    return toUserDto(user);  
  }

  

  async addAccessUser(user:User, accessUsName: string, nameP:string): Promise<String>{

    const proj:Project = await getConnection().query(
      `
      select p.id, p.name, p.createAt
      from users u 
          join user_proj up on u.id = up.userId
          join projects p on p.id = up.projectId
      where u.id = ${user.id} and p.name = '${nameP}';
      `
  )

  if(Object.entries(proj).length === 0){
    throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }

  const userAccess : User = await this.userRepo.findOne({
    where: {
      login: accessUsName,
    }
  })

  if(!userAccess){
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  const userProj: UserProj = new UserProj();
  userProj.user = userAccess;
  userProj.project = proj[0];

  const result = await this.userProjRepo.insert(userProj);

  if(result){
    return "Add access to user!"
  } else{
    return "Dont give access!"
  }

  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


}

