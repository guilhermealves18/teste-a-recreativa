import type { EvaluationEntity } from 'src/app/modules/lesson-plan/core/entities/evaluation.entity';

export class PrismaEvaluationMapper {
  static fromAppToPrisma(data: EvaluationEntity) {
    return {
      ...data,
      ...(!data.id && {
        createdAt: data.createdAt ?? new Date(),
      }),
    };
  }
}
