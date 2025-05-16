import { Injectable } from '@nestjs/common';
import type { CreateLessonPlanDto } from '../../infra/http/dtos/create-lesson-plan.dto';
import { LessonPlanEntity } from '../entities/lesson-plan.entity';
import { LessonPlanMapper } from '../mappers/lesson-plan.mapper';
import { LessonPlanRepository } from '../repositories/lesson-plan.repository';
import { CreateActivityUseCase } from './create-activity.use-case';
import { CreateEvaluationUseCase } from './create-evaluation.use-case';
import { CreateObjectiveUseCase } from './create-objective.use-case';
import { FindLessonPlanByIdUseCase } from './find-lesson-plan-by-id.use-case';
import { GenerateLessonPlanPDFUseCase } from './generate-lesson-plan-pdf.use-case';

@Injectable()
export class CreateManuallyLessonPlanUseCase {
  constructor(
    private readonly createObjectiveUseCase: CreateObjectiveUseCase,
    private readonly createActivityUseCase: CreateActivityUseCase,
    private readonly createEvaluationUseCase: CreateEvaluationUseCase,
    private readonly findLessonPlanByIdUseCase: FindLessonPlanByIdUseCase,
    private readonly lessonPlanRepository: LessonPlanRepository,
    private readonly generateLessonPlanPDFUseCase: GenerateLessonPlanPDFUseCase,
  ) {}

  async execute(data: CreateLessonPlanDto) {
    const { title, objectives, activities, evaluation } = data;

    const parseToArray = (input: string): string[] => {
      return input
        .split(/[\n,;]+/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    };

    const parsedData = {
      objectives: parseToArray(objectives || ''),
      activities: parseToArray(activities || ''),
      evaluation: parseToArray(evaluation || ''),
    };

    const lessonPlanEntity = new LessonPlanEntity(
      LessonPlanMapper.fromAppToEntity({
        title,
        uploadedFilePath: 'manual',
        filePath: 'manual',
      }),
    );

    const createdLessonPlan =
      await this.lessonPlanRepository.create(lessonPlanEntity);

    for (const objective of parsedData.objectives) {
      await this.createObjectiveUseCase.execute({
        lessonPlanId: createdLessonPlan.id ?? '',
        title: objective,
      });
    }

    for (const activity of parsedData.activities) {
      await this.createActivityUseCase.execute({
        lessonPlanId: createdLessonPlan.id ?? '',
        title: activity,
      });
    }

    for (const evaluation of parsedData.evaluation) {
      await this.createEvaluationUseCase.execute({
        lessonPlanId: createdLessonPlan.id ?? '',
        title: evaluation,
      });
    }

    const pdfOutputPath = await this.generateLessonPlanPDFUseCase.execute({
      lessonPlanId: createdLessonPlan.id ?? '',
      filePath: 'manual',
      createdAt: createdLessonPlan.createdAt ?? new Date(),
      title,
      objectives: parsedData.objectives,
      activities: parsedData.activities,
      evaluation: parsedData.evaluation,
    });

    createdLessonPlan.filePath = pdfOutputPath;
    await this.lessonPlanRepository.update(
      createdLessonPlan?.id ?? '',
      createdLessonPlan,
    );

    return await this.findLessonPlanByIdUseCase.execute(
      createdLessonPlan.id ?? '',
    );
  }
}
