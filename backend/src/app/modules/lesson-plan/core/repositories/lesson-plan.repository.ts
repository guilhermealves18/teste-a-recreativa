import type {
  CreateLessonPlanDto,
  LessonPlanQueryParamsProps,
  PaginatedLessonPlan,
} from '../../infra/http/dtos/create-lesson-plan.dto';
import type { UpdateLessonPlanDto } from '../../infra/http/dtos/update-lesson-plan.dto';
import type { LessonPlanEntity } from '../entities/lesson-plan.entity';

export abstract class LessonPlanRepository {
  abstract create(data: CreateLessonPlanDto): Promise<LessonPlanEntity>;
  abstract update(
    id: string,
    data: UpdateLessonPlanDto,
  ): Promise<LessonPlanEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<LessonPlanEntity>;
  abstract list(
    queryParams: LessonPlanQueryParamsProps,
  ): Promise<PaginatedLessonPlan>;
}
