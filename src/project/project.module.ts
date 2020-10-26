import { CacheModule, Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { UserService } from 'src/user/services/user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entity/user.entity';
import { UserProj } from './entity/userproject.entiry';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User, UserProj]),
    UserModule,
    AuthModule,
    // CacheModule.register(),
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
