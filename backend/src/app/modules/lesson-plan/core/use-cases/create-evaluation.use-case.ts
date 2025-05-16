import { Injectable } from '@nestjs/common';
import type { CreateEvaluationDto } from '../../infra/http/dtos/create-evaluation.dto';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { EvaluationMapper } from '../mappers/evaluation.mapper';
import { EvaluationRepository } from '../repositories/evaluation.repository';

@Injectable()
export class CreateEvaluationUseCase {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}

  async execute(data: CreateEvaluationDto) {
    const evaluationEntity = new EvaluationEntity(
      EvaluationMapper.fromAppToEntity(data),
    );

    return await this.evaluationRepository.create(evaluationEntity);
  }
}
