import { Injectable } from '@nestjs/common';
import { FileService } from '../../infra/database/file.service';
import type { CreateLessonPlanDto } from '../../infra/http/dtos/create-lesson-plan.dto';
import { LessonPlanEntity } from '../entities/lesson-plan.entity';
import { LessonPlanMapper } from '../mappers/lesson-plan.mapper';
import { LessonPlanRepository } from '../repositories/lesson-plan.repository';
import { CreateActivityUseCase } from './create-activity.use-case';
import { CreateEvaluationUseCase } from './create-evaluation.use-case';
import { CreateObjectiveUseCase } from './create-objective.use-case';
import { FindLessonPlanByIdUseCase } from './find-lesson-plan-by-id.use-case';
import { GenerateLessonPlanPDFUseCase } from './generate-lesson-plan-pdf.use-case';

@Injectable()
export class CreateLessonPlanUseCase {
  constructor(
    private readonly createObjectiveUseCase: CreateObjectiveUseCase,
    private readonly createActivityUseCase: CreateActivityUseCase,
    private readonly createEvaluationUseCase: CreateEvaluationUseCase,
    private readonly findLessonPlanByIdUseCase: FindLessonPlanByIdUseCase,
    private readonly lessonPlanRepository: LessonPlanRepository,
    private readonly fileService: FileService,
    private readonly generateLessonPlanPDFUseCase: GenerateLessonPlanPDFUseCase,
  ) {}

  async execute(
    file: Express.Multer.File,
    data: CreateLessonPlanDto,
  ): Promise<LessonPlanEntity | null> {
    let extractedText = '';

    const objectives: string[] = [];
    const activities: string[] = [];
    const evaluations: string[] = [];

    if (file) {
      const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
      if (fileExtension === 'pdf') {
        extractedText = await this.fileService.extractTextFromPDF(file.path);
      } else if (fileExtension === 'docx') {
        extractedText = await this.fileService.extractTextFromDocx(file.path);
      }

      if (extractedText) {
        // Normalizar o texto extraído
        extractedText = extractedText
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n+/g, '\n')
          .trim();

        const lines = extractedText
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        let currentSection: 'objectives' | 'activities' | 'evaluation' | null =
          null;

        for (const line of lines) {
          const item = line.replace(/^-/, '').trim();

          if (line.toLowerCase().startsWith('objetivos:')) {
            currentSection = 'objectives';
          } else if (line.toLowerCase().startsWith('atividades:')) {
            currentSection = 'activities';
          } else if (line.toLowerCase().startsWith('avaliação:')) {
            currentSection = 'evaluation';
          } else if (currentSection && line.startsWith('-')) {
            if (currentSection === 'objectives') {
              objectives.push(item);
            } else if (currentSection === 'activities') {
              activities.push(item);
            } else if (currentSection === 'evaluation') {
              evaluations.push(item);
            }
          }
        }

        if (
          objectives.length === 0 &&
          activities.length === 0 &&
          evaluations.length === 0
        ) {
          const sections = {
            objectives: /Objetivos:(.+?)(Atividades:|Avaliação:|$)/is,
            activities: /Atividades:(.+?)(Avaliação:|$)/is,
            evaluation: /Avaliação:(.+)/is,
          };

          for (const [section, regex] of Object.entries(sections)) {
            const match = extractedText.match(regex);
            if (match && match[1]) {
              const items = match[1]
                .split('-')
                .map((item) => item.trim())
                .filter((item) => item.length > 0);
              if (section === 'objectives') objectives.push(...items);
              else if (section === 'activities') activities.push(...items);
              else if (section === 'evaluation') evaluations.push(...items);
            }
          }
        }

        // Extração do título ajustada para ambos os formatos
        // Este código foi o Copilot que gerou e funciona bem.
        if (!data.title && extractedText.includes('Plano de Aula -')) {
          const titleMatch = extractedText.match(
            /Plano de Aula - (.+?)(?:\n|Data:|$)/i,
          );
          if (titleMatch && titleMatch[1]) {
            data.title = titleMatch[1].trim().split('Data:')[0].trim();
          } else {
            const titleLineIndex = lines.findIndex((line) =>
              line.startsWith('Plano de Aula -'),
            );
            if (titleLineIndex !== -1) {
              let title = lines[titleLineIndex];
              if (titleLineIndex + 1 < lines.length) {
                title += ' ' + lines[titleLineIndex + 1];
              }
              data.title =
                title.replace('Plano de Aula -', '').split('Data:')[0].trim() ||
                'Plano de Aula Sem Título';
            } else {
              data.title = 'Plano de Aula Sem Título';
            }
          }
        } else if (!data.title) {
          data.title = 'Plano de Aula Sem Título';
        }
      }
    }

    const lessonPlanEntity = new LessonPlanEntity(
      LessonPlanMapper.fromAppToEntity({
        ...data,
        filePath: file?.path || data.filePath,
      }),
    );

    const createdLessonPlan = await this.lessonPlanRepository.create({
      ...data,
      id: lessonPlanEntity.id,
      uploadedFilePath: file?.path || data.filePath,
      filePath: file?.filename,
      createdAt: lessonPlanEntity.createdAt,
    });

    for (const objective of objectives) {
      await this.createObjectiveUseCase.execute({
        title: objective,
        lessonPlanId: createdLessonPlan.id ?? '',
      });
    }

    for (const activity of activities) {
      await this.createActivityUseCase.execute({
        title: activity,
        lessonPlanId: createdLessonPlan.id ?? '',
      });
    }

    for (const evaluation of evaluations) {
      await this.createEvaluationUseCase.execute({
        title: evaluation,
        lessonPlanId: createdLessonPlan.id ?? '',
      });
    }

    const lessonPlan = await this.findLessonPlanByIdUseCase.execute(
      createdLessonPlan.id ?? '',
    );

    const objectivesForPDF =
      lessonPlan?.Objectives?.map((objective) => objective.title) ?? objectives;
    const activitiesForPDF =
      lessonPlan?.Activities?.map((activity) => activity.title) ?? activities;
    const evaluationsForPDF =
      lessonPlan?.Evaluations?.map((evaluation) => evaluation.title) ??
      evaluations;

    await this.generateLessonPlanPDFUseCase.execute({
      activities: activitiesForPDF,
      createdAt: lessonPlan?.createdAt ?? null,
      evaluation: evaluationsForPDF,
      filePath: file?.path || data.filePath,
      lessonPlanId: createdLessonPlan.id ?? '',
      objectives: objectivesForPDF,
      title: lessonPlan?.title ?? data.title,
    });

    return lessonPlan;
  }
}
