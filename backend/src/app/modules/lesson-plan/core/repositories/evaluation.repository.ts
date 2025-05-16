import type {
  CreateEvaluationDto,
  EvaluationQueryParamsProps,
  PaginatedEvaluation,
} from '../../infra/http/dtos/create-evaluation.dto';
import type { UpdateEvaluationDto } from '../../infra/http/dtos/update-evaluation.dto';
import type { EvaluationEntity } from '../entities/evaluation.entity';

export abstract class EvaluationRepository {
  abstract create(data: CreateEvaluationDto): Promise<EvaluationEntity>;
  abstract update(
    id: string,
    data: UpdateEvaluationDto,
  ): Promise<EvaluationEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<EvaluationEntity>;
  abstract list(
    queryParams: EvaluationQueryParamsProps,
  ): Promise<PaginatedEvaluation>;
  abstract listByLessonPlanId(
    lessonPlanId: string,
    queryParams: EvaluationQueryParamsProps,
  ): Promise<PaginatedEvaluation>;
}
