import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import type { ActivityEntity } from './activity.entity';
import type { EvaluationEntity } from './evaluation.entity';
import type { ObjectiveEntity } from './objective.entity';

export class LessonPlanEntity {
  constructor(partial: Partial<LessonPlanEntity>) {
    Object.assign(this, partial);
  }

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  title: string;

  @IsString()
  uploadedFilePath: string;

  @IsString()
  filePath: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  @IsOptional()
  Activities?: ActivityEntity[];

  @IsOptional()
  Objectives?: ObjectiveEntity[];

  @IsOptional()
  Evaluations?: EvaluationEntity[];
}
