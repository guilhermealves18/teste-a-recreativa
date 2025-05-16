import { Injectable } from '@nestjs/common';
import type { CreateActivityDto } from '../../infra/http/dtos/create-activity.dto';
import { ActivityEntity } from '../entities/activity.entity';
import { ActivityMapper } from '../mappers/activity.mapper';
import { ActivityRepository } from '../repositories/activity.repository';

@Injectable()
export class CreateActivityUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(data: CreateActivityDto) {
    const activityEntity = new ActivityEntity(
      ActivityMapper.fromAppToEntity(data),
    );

    return await this.activityRepository.create(activityEntity);
  }
}
