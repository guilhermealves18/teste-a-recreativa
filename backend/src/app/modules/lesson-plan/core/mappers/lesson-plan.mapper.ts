import type { CreateLessonPlanDto } from '../../infra/http/dtos/create-lesson-plan.dto';

export class LessonPlanMapper {
  static fromAppToEntity(
    data: CreateLessonPlanDto & {
      createdAt?: Date;
    },
  ) {
    return {
      ...data,
      ...(!data.id && {
        createdAt: data.createdAt ?? new Date(),
      }),
    };
  }
}
