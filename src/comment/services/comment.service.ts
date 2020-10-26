import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entity/project.entity';
import { Task } from 'src/task/entity/task.entity';
import { User } from 'src/user/entity/user.entity';
import { getConnection, InsertResult, Repository } from 'typeorm';
import { Commentsss } from '../entity/comment.entity';
import * as nodemailer from 'nodemailer';
import { CreateCommentDto } from '../dto/create.dto';

@Injectable()
export class CommentService {

    constructor(
    @InjectRepository(Commentsss)    
        private readonly commentRepo: Repository<Commentsss>,
        @InjectRepository(User)    
        private readonly userRepo: Repository<User>,
        @InjectRepository(Task)    
        private readonly taskRepo: Repository<Task>,
        @InjectRepository(Project)    
        private readonly projRepo: Repository<Project>,
        ){}

    public async createCom(user: User, nameT:string, nameP:string, createCommentDto: CreateCommentDto): Promise<String>{

        try{

            const task = await getConnection().query(
                `
                    select * from tasks t where t.projectId = 
                    (select p.id as id
                        from users u 
                            join user_proj up on u.id = up.userId
                            join projects p on p.id = up.projectId
                    where u.id = ${user.id} and p.name = '${nameP}') and t.name = '${nameT}';

                `
            )

            if(Object.entries(task).length === 0){
                throw new HttpException('Not found task', HttpStatus.BAD_REQUEST);
            }

            const userRes : User = await this.userRepo.findOne({
                where: {
                    id: user.id
                }
            })

            const taskRes: Task =await this.taskRepo.findOne({
                where: {
                    name: nameT
                }
            })

            const comment : Commentsss = new Commentsss();
            comment.task=taskRes;
            comment.user=userRes;
            comment.comment=createCommentDto.comment;

            const result = await this.commentRepo.insert(comment);


            const proj = await this.projRepo.findOne({
                where: {
                    name: nameP
                }
            })

            const usersArr= await getConnection().query(
                `
                select distinct users.email
                from users 
                    join user_proj on users.id = user_proj.userid 
                    join projects on projects.id = user_proj.projectid
                    where projects.id=${proj.id};
                `
            ) 

            const arr = Object.values(usersArr[0]);
            for(let i =0; i<arr.length;i++){
                await this.mail(arr[i], createCommentDto.comment);
            }

            console.log(result["raw"]["affectedRows"])

            if(result["raw"]["affectedRows"] !== 0 ){
                return "Comment added !!!";
            } else{
                return "No comment has been added!";
            }

        }catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }

    }


    public async mail(email, comment:string){
        console.log(email)
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ayaa83962@gmail.com',
                pass: 'alex99sasha'
            }
        });


        let mailOptions = {
            from: 'ayaa83962@gmail.com',
            to: `${email}`,
            subject: 'TODOIST',
            text: `${comment}`
        };

        transport.sendMail(mailOptions,function(err, data){
            if(err){
                console.log(err.message);
            }  else{
                console.log('email sent')
            }
        })

    }


}
