import type { ObjectiveEntity } from 'src/app/modules/lesson-plan/core/entities/objective.entity';

export class PrismaObjectiveMapper {
  static fromAppToPrisma(data: ObjectiveEntity) {
    return {
      ...data,
      ...(!data.id && {
        createdAt: data.createdAt ?? new Date(),
      }),
    };
  }
}
