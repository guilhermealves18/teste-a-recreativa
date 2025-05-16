import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateManuallyLessonPlanUseCase } from '../../../core/use-cases/create-manually-lesson-plan.use-case';
import { DeleteLessonPlanByIdUseCase } from '../../../core/use-cases/delete-lesson-plan-by-id.use-case';
import { GenerateLessonPlanUseCase } from '../../../core/use-cases/generate-lesson-plan.use-case';
import { ListLessonPlanUseCase } from '../../../core/use-cases/list-lesson-plan.use-case';
import { CreateLessonPlanDto } from '../dtos/create-lesson-plan.dto';

@Controller('lesson-plan')
export class LessonPlanController {
  constructor(
    private readonly createManuallyLessonPlanUseCase: CreateManuallyLessonPlanUseCase,
    private readonly generateLessonPlanUseCase: GenerateLessonPlanUseCase,
    private readonly listLessonPlanUseCase: ListLessonPlanUseCase,
    private readonly deleteLessonPlanByIdUseCase: DeleteLessonPlanByIdUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createManually(
    @Body()
    data: CreateLessonPlanDto,
  ) {
    return await this.createManuallyLessonPlanUseCase.execute(data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    data: CreateLessonPlanDto,
  ) {
    return await this.generateLessonPlanUseCase.execute(file, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteLessonPlanByIdUseCase.execute(id);
  }

  @Get()
  async listProfileFollowing(
    @Query('order') order: 'asc' | 'desc',
    @Query('page') page: string,
    @Query('per_page') per_page: string,
    @Query('sort') sort: string,
    @Query('term') term: string,
  ) {
    return await this.listLessonPlanUseCase.execute({
      order,
      page,
      per_page,
      sort,
      term,
    });
  }
}
