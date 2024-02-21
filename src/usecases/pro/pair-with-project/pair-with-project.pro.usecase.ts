import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { ProjectEntity } from '@/domain/entities/projects/project.entity';
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
    const pro = this.createProEntityFromInput(input);
    const proScore = pro.calculateScore();
    const eligibleProjects =
      await this.findEligibleProjectsRepository.findEligible(proScore);
    const ineligibleProjects =
      await this.findIneligibleProjectsRepository.findIneligible(proScore);
    const selectedProject = this.getSelectedProject(eligibleProjects);
    return {
      score: proScore,
      selectedProject: selectedProject?.title || null,
      eligibleProjects: this.getProjectsTitles(eligibleProjects),
      ineligibleProjects: this.getProjectsTitles(ineligibleProjects),
    };
  }

  private createProEntityFromInput(input: PairProWithProjectInput): ProEntity {
    return new ProEntity(
      input.age,
      input.educationLevel,
      input.pastExperiences,
      input.internetTest,
      input.writingScore,
      input.referralCode,
    );
  }

  private getProjectsTitles(projects: ProjectEntity[]): string[] {
    return projects.map((project) => project.title);
  }

  private getSelectedProject(
    eligibleProjects: ProjectEntity[],
  ): ProjectEntity | undefined {
    return eligibleProjects.sort((a, b) => b.minimumScore - a.minimumScore)[0];
  }
}
