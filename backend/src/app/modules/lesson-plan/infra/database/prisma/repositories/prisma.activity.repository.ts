import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { createPaginator, PaginatedResult } from 'prisma-pagination';
import { PrismaService } from 'src/app/modules/database/prisma/prisma.service';

import { ActivityEntity } from 'src/app/modules/lesson-plan/core/entities/activity.entity';
import { ActivityRepository } from 'src/app/modules/lesson-plan/core/repositories/activity.repository';
import type {
  ActivityQueryParamsProps,
  CreateActivityDto,
  PaginatedActivity,
} from '../../../http/dtos/create-activity.dto';
import type { UpdateActivityDto } from '../../../http/dtos/update-activity.dto';
import { PrismaActivityMapper } from '../mappers/prisma.activity.mapper';

@Injectable()
export class PrismaActivityRepository implements ActivityRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateActivityDto): Promise<ActivityEntity> {
    const create = await this.prisma.activities.create({
      data: PrismaActivityMapper.fromAppToPrisma(data),
    });

    return plainToClass(ActivityEntity, create);
  }

  async update(id: string, data: UpdateActivityDto): Promise<ActivityEntity> {
    const update = await this.prisma.activities.upsert({
      where: {
        id,
        deletedAt: null,
      },
      create: {
        ...PrismaActivityMapper.fromAppToPrisma(data),
        updatedAt: new Date(),
      },
      update: {
        ...PrismaActivityMapper.fromAppToPrisma(data),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    return plainToClass(ActivityEntity, update);
  }

  async delete(id: string): Promise<void> {
    const now = new Date();

    await this.prisma.$transaction(async (table) => {
      await table.activities.update({
        where: { id },
        data: { deletedAt: now },
      });
    });
  }

  async findById(id: string): Promise<ActivityEntity> {
    const project = await this.prisma.activities.findUnique({
      where: {
        id,
      },
    });

    return plainToClass(ActivityEntity, project);
  }

  async findByLessonPlanId(lessonPlanId: string): Promise<ActivityEntity> {
    const project = await this.prisma.activities.findFirst({
      where: {
        lessonPlanId,
      },
    });

    return plainToClass(ActivityEntity, project);
  }

  async list(
    queryParams: ActivityQueryParamsProps,
  ): Promise<PaginatedActivity> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const activities: PaginatedResult<ActivityEntity> = await paginate(
      this.prisma.activities,
      {
        where: {
          deletedAt: null,
          ...(term && {
            OR: [
              {
                id: {
                  contains: term,
                },
                lessonPlanId: {
                  contains: term,
                },
                title: {
                  contains: term,
                },
              },
            ],
          }),
        },
        orderBy: {
          [sort || 'createdAt']: order || 'asc',
        },
      },
    );

    return activities;
  }

  async listByLessonPlanId(
    lessonPlanId: string,
    queryParams: ActivityQueryParamsProps,
  ): Promise<PaginatedActivity> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const activities: PaginatedResult<ActivityEntity> = await paginate(
      this.prisma.activities,
      {
        where: {
          lessonPlanId,
          deletedAt: null,
          ...(term && {
            OR: [
              {
                id: {
                  contains: term,
                },
                lessonPlanId: {
                  contains: term,
                },
                title: {
                  contains: term,
                },
              },
            ],
          }),
        },
        orderBy: {
          [sort || 'createdAt']: order || 'asc',
        },
      },
    );

    return activities;
  }
}
