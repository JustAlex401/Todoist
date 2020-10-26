import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User]),
  ], 
  controllers: [
    GoogleController
  ],
  providers: [GoogleService, GoogleStrategy]
})
export class GoogleModule {}
