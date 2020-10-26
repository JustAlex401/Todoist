import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { UserDto } from "../dto/user.dto";
import { User } from "../entity/user.entity";

export interface IUserService{
    findOne(): Promise<UserDto>;
    findByLogin({ login, password }: LoginUserDto): Promise<UserDto>;
    findByPayload(login: String): Promise<UserDto>;
    create(userDto: CreateUserDto): Promise<UserDto>;
    addAccessUser(user:User, accessUsName: string, nameP:string): Promise<String>;
}