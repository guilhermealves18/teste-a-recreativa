import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { createPaginator, PaginatedResult } from 'prisma-pagination';
import { PrismaService } from 'src/app/modules/database/prisma/prisma.service';
import { LessonPlanEntity } from 'src/app/modules/lesson-plan/core/entities/lesson-plan.entity';
import { LessonPlanRepository } from 'src/app/modules/lesson-plan/core/repositories/lesson-plan.repository';
import type {
  CreateLessonPlanDto,
  LessonPlanQueryParamsProps,
  PaginatedLessonPlan,
} from '../../../http/dtos/create-lesson-plan.dto';

import type { UpdateLessonPlanDto } from '../../../http/dtos/update-lesson-plan.dto';
import { PrismaLessonPlanMapper } from '../mappers/prisma.lesson-plan.mapper';

@Injectable()
export class PrismaLessonPlanRepository implements LessonPlanRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateLessonPlanDto): Promise<LessonPlanEntity> {
    const { Evaluations, Activities, Objectives, ...dataWithoutRelations } =
      PrismaLessonPlanMapper.fromAppToPrisma(data);

    const create = await this.prisma.lessonPlan.create({
      data: dataWithoutRelations,
    });

    return plainToClass(LessonPlanEntity, create);
  }

  async update(
    id: string,
    data: UpdateLessonPlanDto,
  ): Promise<LessonPlanEntity> {
    const { Evaluations, Activities, Objectives, ...dataWithoutRelations } =
      PrismaLessonPlanMapper.fromAppToPrisma(data);

    const update = await this.prisma.lessonPlan.upsert({
      where: {
        id,
        deletedAt: null,
      },
      create: {
        ...dataWithoutRelations,
        updatedAt: new Date(),
      },
      update: {
        ...dataWithoutRelations,
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    return plainToClass(LessonPlanEntity, update);
  }

  async delete(id: string): Promise<void> {
    const now = new Date();

    await this.prisma.$transaction(async (table) => {
      await table.activities.updateMany({
        where: { lessonPlanId: id },
        data: { deletedAt: now },
      });

      await table.evaluations.updateMany({
        where: { lessonPlanId: id },
        data: { deletedAt: now },
      });

      await table.objectives.updateMany({
        where: { lessonPlanId: id },
        data: { deletedAt: now },
      });

      await table.lessonPlan.update({
        where: { id },
        data: { deletedAt: now },
      });
    });
  }

  async findById(id: string): Promise<LessonPlanEntity> {
    const project = await this.prisma.lessonPlan.findUnique({
      where: {
        id,
      },
      include: {
        Activities: {
          select: {
            id: true,
            title: true,
          },
        },
        Evaluations: {
          select: {
            id: true,
            title: true,
          },
        },
        Objectives: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return plainToClass(LessonPlanEntity, project);
  }

  async list(
    queryParams: LessonPlanQueryParamsProps,
  ): Promise<PaginatedLessonPlan> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const lessonPlans: PaginatedResult<LessonPlanEntity> = await paginate(
      this.prisma.lessonPlan,
      {
        where: {
          deletedAt: null,
          ...(term && {
            OR: [
              {
                id: {
                  contains: term,
                },
                title: {
                  contains: term,
                },
                uploadedFilePath: {
                  contains: term,
                },
                filePath: {
                  contains: term,
                },
              },
            ],
          }),
        },
        include: {
          Activities: {
            select: {
              id: true,
              title: true,
            },
          },
          Evaluations: {
            select: {
              id: true,
              title: true,
            },
          },
          Objectives: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          [sort || 'createdAt']: order || 'asc',
        },
      },
    );

    return lessonPlans;
  }
}
