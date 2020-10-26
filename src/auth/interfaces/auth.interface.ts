import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginStatus } from "src/user/dto/login-status.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { UserDto } from "src/user/dto/user.dto";
import { JwtPayload } from "../jwt.strategy";
import { RegistrationStatus } from "../services/auth.service";


export interface IAuthService{

    register(userDto: CreateUserDto): Promise<RegistrationStatus>;
    login(loginUserDto: LoginUserDto): Promise<LoginStatus>;
    validateUser(payload: JwtPayload): Promise<UserDto>
}