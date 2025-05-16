import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import type { BaseQueryParamsProps } from 'src/helpers/http';
import type { PaginationProps } from 'src/helpers/pagination';

export interface PaginatedObjective extends PaginationProps {
  data: CreateObjectiveDto[];
}

export type ObjectiveQueryParamsProps = BaseQueryParamsProps;

export class CreateObjectiveDto {
  constructor(partial: Partial<CreateObjectiveDto>) {
    Object.assign(this, partial);
  }

  @IsUUID('4', { message: 'The ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @IsUUID('4', { message: 'The lessonPlanId must be a valid UUID.' })
  lessonPlanId: string;

  @IsString({ message: 'The title must be a string.' })
  @IsOptional()
  title: string;

  @IsDate({ message: 'The createdAt must be a valid date.' })
  @IsOptional()
  createdAt?: Date;

  @IsDate({ message: 'The updatedAt must be a valid date.' })
  @IsOptional()
  updatedAt?: Date;

  @IsDate({ message: 'The deletedAt must be a valid date.' })
  @IsOptional()
  deletedAt?: Date;
}
