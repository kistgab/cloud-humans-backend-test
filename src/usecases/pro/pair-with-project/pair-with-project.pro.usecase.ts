import { ProEntity } from '@/domain/pro/entity/pro.entity';
import { IsValidReferralCodeRepository } from '@/domain/pro/repository/is-valid-referral-code.repository';
import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { FindEligibleProjectsRepository } from '@/domain/project/repository/find-eligible-projects.repository';
import { FindIneligibleProjectsRepository } from '@/domain/project/repository/find-ineligible-projects-repository';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export class PairProWithProjectUseCase {
  private readonly VALID_REFERRAL_CODE_POINTS = 1;
  private readonly INVALID_REFERRAL_CODE_POINTS = 0;

  constructor(
    private readonly findEligibleProjectsRepository: FindEligibleProjectsRepository,
    private readonly findIneligibleProjectsRepository: FindIneligibleProjectsRepository,
    private readonly isValidReferralCodeRepository: IsValidReferralCodeRepository,
  ) {}

  async pair(
    input: PairProWithProjectInput,
  ): Promise<PairProWithProjectOutput> {
    const pro = this.createProEntityFromInput(input);
    const proScore = pro.calculateScore();
    await this.calculateReferralCodePoints(input.referralCode);
    const eligibleProjects =
      await this.findEligibleProjectsRepository.findAllEligibles(proScore);
    const ineligibleProjects =
      await this.findIneligibleProjectsRepository.findAllIneligibles(proScore);
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

  private async calculateReferralCodePoints(
    referralCode?: string,
  ): Promise<number> {
    if (!referralCode) {
      return this.INVALID_REFERRAL_CODE_POINTS;
    }
    const isValid =
      await this.isValidReferralCodeRepository.isValidReferralCode(
        referralCode,
      );
    return isValid
      ? this.VALID_REFERRAL_CODE_POINTS
      : this.INVALID_REFERRAL_CODE_POINTS;
  }
}
