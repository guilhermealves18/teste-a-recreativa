import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class ActivityEntity {
  constructor(partial: Partial<ActivityEntity>) {
    Object.assign(this, partial);
  }

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  lessonPlanId: string;

  @IsString()
  title: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
