import { ProjectDto } from "src/project/dto/project.dto";
import { Project } from "src/project/entity/project.entity";
import { UserDto } from "src/user/dto/user.dto";
import { User } from "src/user/entity/user.entity";

export const toUserDto = (data: User): UserDto => {  
    const { id, login, email } = data;
    let userDto: UserDto = { id, login, email};
    return userDto;
};

export const toProjDto = (data: Project): ProjectDto => {  
    const { id,name, createAt} = data;
    let projectDto: ProjectDto = { id, name, createAt};
    return projectDto;
};