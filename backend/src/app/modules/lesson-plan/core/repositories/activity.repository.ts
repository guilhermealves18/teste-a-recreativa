import type {
  ActivityQueryParamsProps,
  CreateActivityDto,
  PaginatedActivity,
} from '../../infra/http/dtos/create-activity.dto';
import type { UpdateActivityDto } from '../../infra/http/dtos/update-activity.dto';
import type { ActivityEntity } from '../entities/activity.entity';

export abstract class ActivityRepository {
  abstract create(data: CreateActivityDto): Promise<ActivityEntity>;
  abstract update(id: string, data: UpdateActivityDto): Promise<ActivityEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<ActivityEntity>;
  abstract findByLessonPlanId(lessonPlanId: string): Promise<ActivityEntity>;
  abstract list(
    queryParams: ActivityQueryParamsProps,
  ): Promise<PaginatedActivity>;
  abstract listByLessonPlanId(
    lessonPlanId: string,
    queryParams: ActivityQueryParamsProps,
  ): Promise<PaginatedActivity>;
}
