import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import type { BaseQueryParamsProps } from 'src/helpers/http';
import type { PaginationProps } from 'src/helpers/pagination';

export interface PaginatedLessonPlan extends PaginationProps {
  data: CreateLessonPlanDto[];
}

export type LessonPlanQueryParamsProps = BaseQueryParamsProps;

export class CreateLessonPlanDto {
  constructor(partial: Partial<CreateLessonPlanDto>) {
    Object.assign(this, partial);
  }

  @IsUUID('4', { message: 'The ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @IsString({ message: 'The title must be a string.' })
  @IsOptional()
  title: string;

  @IsString({ message: 'The uploadedFilePath must be a string.' })
  uploadedFilePath: string;

  @IsString({ message: 'The filePath must be a string.' })
  filePath: string;

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
