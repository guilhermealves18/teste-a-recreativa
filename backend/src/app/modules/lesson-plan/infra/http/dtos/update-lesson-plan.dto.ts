import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateLessonPlanDto } from './create-lesson-plan.dto';

export class UpdateLessonPlanDto extends PartialType(CreateLessonPlanDto) {
  constructor(partial: Partial<CreateLessonPlanDto>) {
    super();
    Object.assign(this, partial);
  }

  @IsString({ message: 'The title must be a string.' })
  @IsOptional()
  title: string;

  @IsString({ message: 'The uploadedFilePath must be a string.' })
  uploadedFilePath: string;

  @IsString({ message: 'The filePath must be a string.' })
  @IsOptional()
  filePath: string;
}
