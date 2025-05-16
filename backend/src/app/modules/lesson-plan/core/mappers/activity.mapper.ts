import type { CreateActivityDto } from '../../infra/http/dtos/create-activity.dto';

export class ActivityMapper {
  static fromAppToEntity(
    data: CreateActivityDto & {
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
