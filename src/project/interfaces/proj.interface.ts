import { User } from "src/user/entity/user.entity";
import { CreateProgDto } from "../dto/create-prog.dto";
import { ProjectDto } from "../dto/project.dto";
import { UpdateProjDto } from "../dto/update-prog.dto";

export interface IProjService {
    createProj(user: User,createProgDto: CreateProgDto): Promise<ProjectDto>;
    findByProgName(user : User, name: string): Promise<ProjectDto>;
    getAllProject(user: User): Promise<ProjectDto>;
    updateProj(user: User, updateProjDto: UpdateProjDto, nameP: string): Promise<String>;
    deleteProj(user: User, nameP: string): Promise<String>;
    find(user : User, name: string): Promise<ProjectDto>;
}