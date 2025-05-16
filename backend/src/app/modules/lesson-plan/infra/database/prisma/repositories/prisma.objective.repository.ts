import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { createPaginator, PaginatedResult } from 'prisma-pagination';
import { PrismaService } from 'src/app/modules/database/prisma/prisma.service';

import { ObjectiveEntity } from 'src/app/modules/lesson-plan/core/entities/objective.entity';
import { ObjectiveRepository } from 'src/app/modules/lesson-plan/core/repositories/objective.repository';
import type {
  CreateObjectiveDto,
  ObjectiveQueryParamsProps,
  PaginatedObjective,
} from '../../../http/dtos/create-objective.dto';
import type { UpdateObjectiveDto } from '../../../http/dtos/update-objective.dto';
import { PrismaObjectiveMapper } from '../mappers/prisma.objective.mapper';

@Injectable()
export class PrismaObjectiveRepository implements ObjectiveRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateObjectiveDto): Promise<ObjectiveEntity> {
    const create = await this.prisma.objectives.create({
      data: PrismaObjectiveMapper.fromAppToPrisma(data),
    });

    return plainToClass(ObjectiveEntity, create);
  }

  async update(id: string, data: UpdateObjectiveDto): Promise<ObjectiveEntity> {
    const update = await this.prisma.objectives.upsert({
      where: {
        id,
        deletedAt: null,
      },
      create: {
        ...PrismaObjectiveMapper.fromAppToPrisma(data),
        updatedAt: new Date(),
      },
      update: {
        ...PrismaObjectiveMapper.fromAppToPrisma(data),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    return plainToClass(ObjectiveEntity, update);
  }

  async delete(id: string): Promise<void> {
    const now = new Date();

    await this.prisma.$transaction(async (table) => {
      await table.objectives.update({
        where: { id },
        data: { deletedAt: now },
      });
    });
  }

  async findById(id: string): Promise<ObjectiveEntity> {
    const project = await this.prisma.objectives.findUnique({
      where: {
        id,
      },
    });

    return plainToClass(ObjectiveEntity, project);
  }

  async list(
    queryParams: ObjectiveQueryParamsProps,
  ): Promise<PaginatedObjective> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const objectives: PaginatedResult<ObjectiveEntity> = await paginate(
      this.prisma.objectives,
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

    return objectives;
  }

  async listByLessonPlanId(
    lessonPlanId: string,
    queryParams: ObjectiveQueryParamsProps,
  ): Promise<PaginatedObjective> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const objectives: PaginatedResult<ObjectiveEntity> = await paginate(
      this.prisma.objectives,
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

    return objectives;
  }
}
