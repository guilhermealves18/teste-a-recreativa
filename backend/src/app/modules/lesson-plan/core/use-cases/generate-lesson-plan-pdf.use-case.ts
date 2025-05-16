import { Injectable } from '@nestjs/common';
import { FileService } from '../../infra/database/file.service';

@Injectable()
export class GenerateLessonPlanPDFUseCase {
  constructor(private readonly fileService: FileService) {}

  async execute(data: {
    lessonPlanId: string;
    filePath: string;
    createdAt: Date | null;
    objectives: string[];
    activities: string[];
    evaluation: string[];
    title: string;
  }): Promise<string> {
    const outputPath = `./uploads/generated-${data.lessonPlanId}.pdf`;
    await this.fileService.generatePDF(data, outputPath);

    return outputPath;
  }
}
