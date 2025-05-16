import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  constructor(partial: Partial<CreateActivityDto>) {
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
