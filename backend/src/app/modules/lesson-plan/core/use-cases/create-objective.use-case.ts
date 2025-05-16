import { Injectable } from '@nestjs/common';
import type { CreateObjectiveDto } from '../../infra/http/dtos/create-objective.dto';
import { ObjectiveEntity } from '../entities/objective.entity';
import { ObjectiveMapper } from '../mappers/objective.mapper';
import { ObjectiveRepository } from '../repositories/objective.repository';

@Injectable()
export class CreateObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async execute(data: CreateObjectiveDto) {
    const objectiveEntity = new ObjectiveEntity(
      ObjectiveMapper.fromAppToEntity(data),
    );

    return await this.objectiveRepository.create(objectiveEntity);
  }
}
