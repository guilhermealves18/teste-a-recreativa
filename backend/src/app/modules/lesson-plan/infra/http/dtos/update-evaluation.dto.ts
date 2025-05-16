import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {
  constructor(partial: Partial<CreateEvaluationDto>) {
    super();
    Object.assign(this, partial);
  }

  @IsUUID('4', { message: 'The lessonPlanId must be a valid UUID.' })
  @IsOptional()
  lessonPlanId: string;

  @IsString({ message: 'The title must be a string.' })
  @IsOptional()
  title: string;
}
