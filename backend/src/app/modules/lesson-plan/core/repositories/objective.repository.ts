import type {
  CreateObjectiveDto,
  ObjectiveQueryParamsProps,
  PaginatedObjective,
} from '../../infra/http/dtos/create-objective.dto';
import type { UpdateObjectiveDto } from '../../infra/http/dtos/update-objective.dto';
import type { ObjectiveEntity } from '../entities/objective.entity';

export abstract class ObjectiveRepository {
  abstract create(data: CreateObjectiveDto): Promise<ObjectiveEntity>;
  abstract update(
    id: string,
    data: UpdateObjectiveDto,
  ): Promise<ObjectiveEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<ObjectiveEntity>;
  abstract list(
    queryParams: ObjectiveQueryParamsProps,
  ): Promise<PaginatedObjective>;
  abstract listByLessonPlanId(
    lessonPlanId: string,
    queryParams: ObjectiveQueryParamsProps,
  ): Promise<PaginatedObjective>;
}
