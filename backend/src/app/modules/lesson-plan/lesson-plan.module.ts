import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ActivityRepository } from './core/repositories/activity.repository';
import { EvaluationRepository } from './core/repositories/evaluation.repository';
import { LessonPlanRepository } from './core/repositories/lesson-plan.repository';
import { ObjectiveRepository } from './core/repositories/objective.repository';
import { CreateActivityUseCase } from './core/use-cases/create-activity.use-case';
import { CreateEvaluationUseCase } from './core/use-cases/create-evaluation.use-case';
import { CreateLessonPlanUseCase } from './core/use-cases/create-lesson-plan.use-case';
import { CreateObjectiveUseCase } from './core/use-cases/create-objective.use-case';
import { FindLessonPlanByIdUseCase } from './core/use-cases/find-lesson-plan-by-id.use-case';
import { GenerateLessonPlanPDFUseCase } from './core/use-cases/generate-lesson-plan-pdf.use-case';
import { ListLessonPlanUseCase } from './core/use-cases/list-lesson-plan.use-case';
import { FileService } from './infra/database/file.service';
import { PrismaActivityRepository } from './infra/database/prisma/repositories/prisma.activity.repository';
import { PrismaEvaluationRepository } from './infra/database/prisma/repositories/prisma.evaluation.repository';
import { PrismaLessonPlanRepository } from './infra/database/prisma/repositories/prisma.lesson-plan.repository';
import { PrismaObjectiveRepository } from './infra/database/prisma/repositories/prisma.objective.repository';
import { LessonPlanController } from './infra/http/controllers/lesson-plan.controller';
import { DeleteLessonPlanByIdUseCase } from './core/use-cases/delete-lesson-plan-by-id.use-case';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [LessonPlanController],
  providers: [
    {
      provide: LessonPlanRepository,
      useClass: PrismaLessonPlanRepository,
    },
    {
      provide: ObjectiveRepository,
      useClass: PrismaObjectiveRepository,
    },
    {
      provide: ActivityRepository,
      useClass: PrismaActivityRepository,
    },
    {
      provide: EvaluationRepository,
      useClass: PrismaEvaluationRepository,
    },
    FileService,
    CreateObjectiveUseCase,
    CreateActivityUseCase,
    CreateEvaluationUseCase,
    CreateLessonPlanUseCase,
    ListLessonPlanUseCase,
    DeleteLessonPlanByIdUseCase,
    GenerateLessonPlanPDFUseCase,
    FindLessonPlanByIdUseCase,
  ],
})
export class LessonPlanModule {}
