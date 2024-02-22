import { RequestPairWithProject } from '@/infrastructure/pro/dto/pair/request-pair-with-project.dto';
import { PairProWithProjectController } from '@/presentation/pro/controllers/pair-with-project.pro.controller';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('pros')
export class ProRoutes {
  @Post('pairWithProject')
  @HttpCode(HttpStatus.OK)
  async pairProWihProject(@Body() request: RequestPairWithProject) {
    const controller = new PairProWithProjectController();
    const response = controller.handle(request);
    return response;
  }
}
