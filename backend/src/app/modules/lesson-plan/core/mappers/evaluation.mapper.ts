import type { CreateEvaluationDto } from '../../infra/http/dtos/create-evaluation.dto';

export class EvaluationMapper {
  static fromAppToEntity(
    data: CreateEvaluationDto & {
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
