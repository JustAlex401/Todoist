import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/services/user.service';
import { getConnection, getManager, Repository, UpdateResult } from 'typeorm';
import { CreateProgDto } from '../dto/create-prog.dto';
import { ProjectDto } from '../dto/project.dto';
import { UpdateProjDto } from '../dto/update-prog.dto';
import { Project } from '../entity/project.entity';
import { UserProj } from '../entity/userproject.entiry';
import { IProjService } from '../interfaces/proj.interface';

@Injectable()
export class ProjectService implements IProjService{
    
    constructor(
        @InjectRepository(Project)    
        private readonly projectRepo: Repository<Project>, 
        @InjectRepository(UserProj)    
        private readonly userProjRepo: Repository<UserProj>, 
        
        ) {}

    async createProj(user: User,createProgDto: CreateProgDto): Promise<ProjectDto>{

            let result;
            await getManager().transaction(async transactionalEntityManager => {

                const existPr = await this.projectRepo.findOne({
                    where: {
                        name : createProgDto.name,
                    }
                })

                console.log(existPr)

                if(existPr){
                    throw new HttpException('Dublicate', HttpStatus.BAD_REQUEST); 
                }

                const proj: Project = await this.projectRepo.create(createProgDto);
                result = await transactionalEntityManager.save<Project>(proj);
                if(!result){
                    throw new HttpException('Not created Proj', HttpStatus.BAD_REQUEST); 
                }
                
                const usPr = new UserProj();
                usPr.user = user;
                usPr.project = <Project>proj;

                const usProj:UserProj = await this.userProjRepo.create(usPr);
                if(!proj){
                    throw new HttpException('Not created UsProj', HttpStatus.BAD_REQUEST); 
                }
                await transactionalEntityManager.save<UserProj>(usProj);
            })
            return result;
            
    }

    async findByProgName(user : User, name: string): Promise<ProjectDto> {
        try{
            const result:ProjectDto = await this.find(user, name);
            if(Object.entries(result).length === 0){
                throw new HttpException('Not found project', HttpStatus.BAD_REQUEST);
            }
            return result;
        } catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }


 async getAllProject(user: User): Promise<ProjectDto> {

    try {
        const result:ProjectDto = await getConnection().query(
            `
            select p.id, p.name as p_name, p.createAt
            from users u 
                join user_proj up on u.id = up.userId
                join projects p on p.id = up.projectId
            where u.id = ${user.id};
            `
        )

        if(Object.entries(result).length === 0){
            throw new HttpException('Not found project', HttpStatus.BAD_REQUEST);
        }
        return result;
    
    } catch(err){
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
}


    /////////////////////////////////////////////////////////////////////////


    async updateProj(user: User, updateProjDto: UpdateProjDto, nameP: string): Promise<String> {

        const proj = await this.find(user, nameP);
        console.log(proj)

        if(Object.entries(proj).length === 0){
            throw new HttpException('Not found project', HttpStatus.BAD_REQUEST); 
        }

        const projUpdate = await this.find(user, updateProjDto.name);

        console.log(projUpdate)

        if(Object.entries(projUpdate).length !== 0){
            throw new HttpException('Name for update is exists', HttpStatus.BAD_REQUEST); 
        }

        const result = await getConnection()
        .createQueryBuilder()
        .update(Project)
        .set(updateProjDto)
        .where("id =:id",{
            id: proj[0]["id"],
        }).execute();

        if(result["raw"]["changedRows"] !== 0){
            return 'Updated';
        }else{
            throw new HttpException('Not Updated', HttpStatus.BAD_REQUEST);
        }
    }



    /////////////////////////////////////////////////////////////////////////
    async deleteProj(user: User, nameP: string): Promise<String> {
        console.log(user)
        const proj:ProjectDto = await this.findByProgName(user, nameP);

        console.log(proj)

        if(Object.entries(proj).length === 0){
            throw new HttpException('Not found project', HttpStatus.BAD_REQUEST); 
        }

        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(UserProj)
        .where("projectId =:id",{
            id: proj[0]["id"],
        }).execute().catch(err => {
            throw new HttpException('Not found project', HttpStatus.BAD_REQUEST); 
        });


        const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where("id =:id",{
            id: proj[0]["id"],
        }).execute();

        if(result["raw"]["effected"] !== 0){
            return 'Deleted';
        }else{
            throw new HttpException('Not Deleted', HttpStatus.BAD_REQUEST);
        }
    }


    async find(user : User, name: string): Promise<ProjectDto>{
        try{
            const result:ProjectDto = await getConnection().query(
                `
                select p.id, p.name, p.createAt
                from users u 
                    join user_proj up on u.id = up.userId
                    join projects p on p.id = up.projectId
                where u.id = ${user.id} and p.name = '${name}';
                `
            )
            return result;
        } catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
