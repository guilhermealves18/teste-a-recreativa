import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateObjectiveDto } from './create-objective.dto';

export class UpdateObjectiveDto extends PartialType(CreateObjectiveDto) {
  constructor(partial: Partial<CreateObjectiveDto>) {
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
