import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { createPaginator, PaginatedResult } from 'prisma-pagination';
import { PrismaService } from 'src/app/modules/database/prisma/prisma.service';

import { EvaluationEntity } from 'src/app/modules/lesson-plan/core/entities/evaluation.entity';
import type { EvaluationRepository } from 'src/app/modules/lesson-plan/core/repositories/evaluation.repository';
import type {
  CreateEvaluationDto,
  EvaluationQueryParamsProps,
  PaginatedEvaluation,
} from '../../../http/dtos/create-evaluation.dto';
import type { UpdateEvaluationDto } from '../../../http/dtos/update-evaluation.dto';
import { PrismaEvaluationMapper } from '../mappers/prisma.evaluation.mapper';

@Injectable()
export class PrismaEvaluationRepository implements EvaluationRepository {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateEvaluationDto): Promise<EvaluationEntity> {
    const create = await this.prisma.evaluations.create({
      data: PrismaEvaluationMapper.fromAppToPrisma(data),
    });

    return plainToClass(EvaluationEntity, create);
  }

  async update(
    id: string,
    data: UpdateEvaluationDto,
  ): Promise<EvaluationEntity> {
    const update = await this.prisma.evaluations.upsert({
      where: {
        id,
        deletedAt: null,
      },
      create: {
        ...PrismaEvaluationMapper.fromAppToPrisma(data),
        updatedAt: new Date(),
      },
      update: {
        ...PrismaEvaluationMapper.fromAppToPrisma(data),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    return plainToClass(EvaluationEntity, update);
  }

  async delete(id: string): Promise<void> {
    const now = new Date();

    await this.prisma.$transaction(async (table) => {
      await table.evaluations.update({
        where: { id },
        data: { deletedAt: now },
      });
    });
  }

  async findById(id: string): Promise<EvaluationEntity> {
    const project = await this.prisma.evaluations.findUnique({
      where: {
        id,
      },
    });

    return plainToClass(EvaluationEntity, project);
  }

  async list(
    queryParams: EvaluationQueryParamsProps,
  ): Promise<PaginatedEvaluation> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const evaluations: PaginatedResult<EvaluationEntity> = await paginate(
      this.prisma.evaluations,
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

    return evaluations;
  }

  async listByLessonPlanId(
    lessonPlanId: string,
    queryParams: EvaluationQueryParamsProps,
  ): Promise<PaginatedEvaluation> {
    const { order, page, per_page, sort, term } = queryParams;

    const paginate = createPaginator({
      page: Number(page),
      perPage: Number(per_page),
    });

    const evaluations: PaginatedResult<EvaluationEntity> = await paginate(
      this.prisma.evaluations,
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

    return evaluations;
  }
}
