import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), CourseModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
