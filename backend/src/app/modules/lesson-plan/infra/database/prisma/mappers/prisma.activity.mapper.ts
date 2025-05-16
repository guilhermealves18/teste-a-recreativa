import type { ActivityEntity } from 'src/app/modules/lesson-plan/core/entities/activity.entity';

export class PrismaActivityMapper {
  static fromAppToPrisma(data: ActivityEntity) {
    return {
      ...data,
      ...(!data.id && {
        createdAt: data.createdAt ?? new Date(),
      }),
    };
  }
}
