import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): object {
    return {
      status: 200,
      message: 'The backend is working correctly.',
    };
  }
}
