import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entity/project.entity';
import { UserProj } from 'src/project/entity/userproject.entiry';
import { User } from 'src/user/entity/user.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create.tdo';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../entity/task.entity';
import { ITaskService } from '../interfaces/task.interface';

@Injectable()
export class TaskService implements ITaskService{
    
    constructor(
        @InjectRepository(Task)    
        private readonly taskRepo: Repository<Task>, 
        @InjectRepository(Project)    
        private readonly projRepo: Repository<Project>, 
        
        ) {}

    async createTask(user: User, createTaskDto: CreateTaskDto, nameP : string): Promise<TaskDto>{

        const userProj : UserProj = await getConnection().query(
            `
                select up.id , up.userId, up.projectId
                from users u 
                    join user_proj up on u.id = up.userId
                    join projects p on p.id = up.projectId
                where u.id = ${user.id} and p.name = '${nameP}';
            `
        )

        if(Object.entries(userProj).length === 0){
            throw new HttpException('Not Found', HttpStatus.BAD_REQUEST); 
        }

        const taskExist = await this.taskRepo.findOne({
            where: {
                name: createTaskDto.name,
            }
        })

        if(taskExist){
            throw new HttpException('Task exist', HttpStatus.BAD_REQUEST); 
        }

        const project = await this.projRepo.findOne({
            where : {
                name: nameP,
            }
        })

        const task = new Task();
        task.name= createTaskDto.name;
        task.description= createTaskDto.description;
        task.project = project;
        task.priority = createTaskDto.priority
        console.log(task)

        const result: TaskDto = await this.taskRepo.save(task)
            
        return result;
}




    async findByTaskName(user : User, nameP: string, nameT:string): Promise<TaskDto> {

        try{
            const result = await getConnection().query(
                `
                    select * from tasks t where t.projectId = 
                    (select p.id as id
                        from users u 
                            join user_proj up on u.id = up.userId
                            join projects p on p.id = up.projectId
                    where u.id = ${user.id} and p.name = '${nameP}') and t.name = '${nameT}';

                `
            )
            return result;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }


 async getAllTasks(user: User, nameP: string): Promise<TaskDto> {

    try{
        const result = await getConnection().query(
            `
                select * from tasks t where t.projectId = 
                (select p.id as id
                from users u 
                    join user_proj up on u.id = up.userId
                    join projects p on p.id = up.projectId
                where u.id = ${user.id} and p.name = '${nameP}');
            `
        )
        return result;
    }catch(err){
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
    

}
   



    async updateTask(user: User, createTaskDto: CreateTaskDto, nameP: string, nameT:string): Promise<String> {
        try{
            const task : TaskDto = await this.findByTaskName(user, nameP, nameT);

            console.log(task);

            if(Object.entries(task).length === 0){
                throw new HttpException('Not found ', HttpStatus.NOT_FOUND); 
            }
    
            for(let key in createTaskDto){
                task[0][key] = createTaskDto[key];
            };
    
            console.log(task);
    
            const result = await this.taskRepo.save(task);
            if(result){
                return 'Task has been updated!';
            } else {
                return 'Task hast updated!';
            }
        }catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }



    async deleteTask(user: User, nameP: string, nameT:string): Promise<String> {
        try{
            const task : TaskDto = await this.findByTaskName(user, nameP, nameT);

            if(Object.entries(task).length === 0){
                throw new HttpException('Not found task', HttpStatus.NOT_FOUND); 
            }

            const result =await this.taskRepo.delete(task);

            if(result["raw"]["effectedRows"] !== 0){
                return 'Task has been Deleted'
            }else{
                return 'Task hasnt deleted!'
            }

        }catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }

    }

}
