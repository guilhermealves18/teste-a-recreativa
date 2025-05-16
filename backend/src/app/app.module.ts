import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database/database.module';
import { LessonPlanModule } from './modules/lesson-plan/lesson-plan.module';

@Module({
  imports: [DatabaseModule.forRoot(), LessonPlanModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
