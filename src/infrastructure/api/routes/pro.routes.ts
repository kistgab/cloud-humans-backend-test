import { RequestPairWithProject } from '@/infrastructure/pro/dto/pair/request-pair-with-project.dto';
import { ResponsePairWithProject } from '@/infrastructure/pro/dto/pair/response-pair-with-project.dto';
import { PairProWithProjectController } from '@/presentation/pro/controllers/pair-with-project.pro.controller';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('pros')
@ApiTags('Pros')
export class ProRoutes {
  @Post('pairWithProject')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User paired with a project with success',
    type: ResponsePairWithProject,
  })
  @ApiOperation({
    summary: 'Calculate a Pro score and allocate to a project',
  })
  async pairProWihProject(@Body() request: RequestPairWithProject) {
    const controller = new PairProWithProjectController();
    const response = controller.handle(request);
    return response;
  }
}
