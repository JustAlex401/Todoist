import {  MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleModule } from './google/google.module';
import { AppController } from './app.controller';
import { ProjectModule } from './project/project.module';
import { LoggerMiddleware } from './project/middleware/logger.middleware';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GoogleModule,
    ProjectModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DATABASE,
      entities: [
          __dirname + './**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    TaskModule,
    CommentModule,
    
  ],
  controllers: [AppController],
  exports: [UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('project');
  }
}
