import type { LessonPlanEntity } from 'src/app/modules/lesson-plan/core/entities/lesson-plan.entity';

export class PrismaLessonPlanMapper {
  static fromAppToPrisma(data: LessonPlanEntity) {
    return {
      ...data,
      ...(!data.id && {
        createdAt: data.createdAt ?? new Date(),
      }),
    };
  }
}
