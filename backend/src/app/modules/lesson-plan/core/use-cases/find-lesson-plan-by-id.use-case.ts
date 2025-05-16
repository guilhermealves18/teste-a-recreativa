import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonPlanRepository } from '../repositories/lesson-plan.repository';

@Injectable()
export class FindLessonPlanByIdUseCase {
  constructor(private readonly lessonPlanRepository: LessonPlanRepository) {}

  async execute(id: string) {
    const lessonPlans = await this.lessonPlanRepository.findById(id);

    if (!lessonPlans) {
      throw new NotFoundException(`Lesson plan with id ${id} not found`);
    }

    return lessonPlans;
  }
}
