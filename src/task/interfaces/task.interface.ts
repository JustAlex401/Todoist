import { User } from "src/user/entity/user.entity";
import { CreateTaskDto } from "../dto/create.tdo";
import { TaskDto } from "../dto/task.dto";
import { Task } from "../entity/task.entity";

export interface ITaskService{
    createTask(user: User, createTaskDto: CreateTaskDto, nameP : string): Promise<TaskDto>;
    findByTaskName(user : User, nameP: string, nameT:string): Promise<TaskDto>;
    getAllTasks(user: User, nameP: string): Promise<TaskDto>;
    updateTask(user: User, createTaskDto: CreateTaskDto, nameP: string, nameT:string): Promise<String>;
    deleteTask(user: User, nameP: string, nameT:string): Promise<String>;
}