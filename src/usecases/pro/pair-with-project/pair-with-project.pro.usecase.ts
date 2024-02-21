import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { Project } from '@/domain/enums/projects.enum';
import { FindEligibleProjectsRepository } from '@/domain/repositories/find-eligible-projects.repository';
import { FindIneligibleProjectsRepository } from '@/domain/repositories/find-ineligible-projects-repository';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export class PairProWithProjectUseCase {
  constructor(
    private readonly findEligibleProjectsRepository: FindEligibleProjectsRepository,
    private readonly findIneligibleProjectsRepository: FindIneligibleProjectsRepository,
  ) {}

  async pair(
    input: PairProWithProjectInput,
  ): Promise<PairProWithProjectOutput> {
    const pro = new ProEntity(
      input.age,
      input.educationLevel,
      input.pastExperiences,
      input.internetTest,
      input.writingScore,
      input.referralCode,
    );
    const proScore = pro.calculateScore();
    const eligibleProjects =
      await this.findEligibleProjectsRepository.findEligible(proScore);
    const eligibleProjectsTitles = eligibleProjects.map(
      (project) => project.title,
    );
    await this.findIneligibleProjectsRepository.findIneligible(proScore);
    return {
      score: proScore,
      selectedProject: Project.CalculateDarkMatterNasa,
      eligibleProjects: eligibleProjectsTitles,
      ineligibleProjects: [],
    };
  }
}
