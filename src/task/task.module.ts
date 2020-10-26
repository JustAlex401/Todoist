import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Commentsss } from 'src/comment/entity/comment.entity';
import { Project } from 'src/project/entity/project.entity';
import { TaskController } from './controllers/task.controller';
import { Task } from './entity/task.entity';
import { TaskService } from './services/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project, Commentsss]),
    AuthModule
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
