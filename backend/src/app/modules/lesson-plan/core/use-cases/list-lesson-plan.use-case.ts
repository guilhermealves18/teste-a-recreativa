import { Injectable, NotFoundException } from '@nestjs/common';
import type { LessonPlanQueryParamsProps } from '../../infra/http/dtos/create-lesson-plan.dto';
import { LessonPlanRepository } from '../repositories/lesson-plan.repository';

@Injectable()
export class ListLessonPlanUseCase {
  constructor(private readonly lessonPlanRepository: LessonPlanRepository) {}

  async execute(queryParams: LessonPlanQueryParamsProps) {
    const lessonPlans = await this.lessonPlanRepository.list(queryParams);

    if (!lessonPlans) {
      throw new NotFoundException('Lesson plans not found');
    }

    return lessonPlans;
  }
}
