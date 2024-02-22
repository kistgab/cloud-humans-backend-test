import { RequestPairWithProject } from '@/infrastructure/pro/dto/pair/request-pair-with-project.dto';
import { ResponsePairWithProject } from '@/infrastructure/pro/dto/pair/response-pair-with-project.dto';
import { PairProWithProjectUseCaseFactory } from '@/infrastructure/pro/factory/pair-with-project-usecase.pro.factory';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export class PairProWithProjectController {
  async handle(
    request: RequestPairWithProject,
  ): Promise<ResponsePairWithProject> {
    const pairProWithProject = PairProWithProjectUseCaseFactory.create();
    const result = await pairProWithProject.pair(
      this.mapRequestToUseCaseInput(request),
    );
    return this.mapUsecaseOutputToResponse(result);
  }

  private mapRequestToUseCaseInput(
    request: RequestPairWithProject,
  ): PairProWithProjectInput {
    return {
      age: request.age,
      educationLevel: request.education_level,
      pastExperiences: {
        sales: request.past_experiences.sales,
        support: request.past_experiences.support,
      },
      internetTest: {
        downloadSpeed: request.internet_test.download_speed,
        uploadSpeed: request.internet_test.upload_speed,
      },
      writingScore: request.writing_score,
      referralCode: request.referral_code,
    };
  }

  private mapUsecaseOutputToResponse(
    output: PairProWithProjectOutput,
  ): ResponsePairWithProject {
    return {
      score: output.score,
      selected_project: output.selectedProject,
      eligible_projects: output.eligibleProjects,
      ineligible_projects: output.ineligibleProjects,
    };
  }
}
