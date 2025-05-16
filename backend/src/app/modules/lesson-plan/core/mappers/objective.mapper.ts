import type { CreateObjectiveDto } from '../../infra/http/dtos/create-objective.dto';

export class ObjectiveMapper {
  static fromAppToEntity(
    data: CreateObjectiveDto & {
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
