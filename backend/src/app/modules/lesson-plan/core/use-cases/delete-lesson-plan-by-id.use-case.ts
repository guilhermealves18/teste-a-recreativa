import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonPlanRepository } from '../repositories/lesson-plan.repository';

@Injectable()
export class DeleteLessonPlanByIdUseCase {
  constructor(private readonly lessonPlanRepository: LessonPlanRepository) {}

  async execute(id: string) {
    const lessonPlans = await this.lessonPlanRepository.findById(id);

    if (!lessonPlans) {
      throw new NotFoundException(`Lesson plan with id ${id} not found`);
    }

    await this.lessonPlanRepository.delete(id);
  }
}
