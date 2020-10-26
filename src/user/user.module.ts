import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './controllers/user.controller';
import { UserProj } from 'src/project/entity/userproject.entiry';
import { Project } from 'src/project/entity/project.entity';
import { Commentsss } from 'src/comment/entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProj, Commentsss]),
  ],
  providers: [
    UserService,
  ],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
