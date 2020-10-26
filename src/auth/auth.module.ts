import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "src/user/services/user.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./services/auth.service";


@Module({  
  imports: [    
      UserModule, 
      ConfigModule.forRoot({
        isGlobal:true,
        envFilePath: `.env`,
      }),
      PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
      }),
      JwtModule.register({
          secret: process.env.JWT_SECRET,
           signOptions: {
              expiresIn: '1h',
          },
      }),
  ], 
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy],  
  exports: [
      PassportModule, 
      JwtModule,
      AuthService,
      JwtStrategy
  ],
})
export class AuthModule {}
