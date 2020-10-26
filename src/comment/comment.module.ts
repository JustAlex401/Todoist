import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentsss } from './entity/comment.entity';
import { Task } from 'src/task/entity/task.entity';
import { User } from 'src/user/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Project } from 'src/project/entity/project.entity';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Commentsss, User, Task, Project]),
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
