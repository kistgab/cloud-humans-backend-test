import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { Project } from '@/domain/enums/projects.enum';
import { FindEligibleProjectsRepository } from '@/domain/repositories/find-eligible-projects.repository';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export class PairProWithProjectUseCase {
  constructor(
    private readonly findEligibleProjectsRepository: FindEligibleProjectsRepository,
  ) {}

  pair(input: PairProWithProjectInput): PairProWithProjectOutput {
    const pro = new ProEntity(
      input.age,
      input.educationLevel,
      input.pastExperiences,
      input.internetTest,
      input.writingScore,
      input.referralCode,
    );
    const proScore = pro.calculateScore();
    this.findEligibleProjectsRepository.findEligible(proScore);
    return {
      score: proScore,
      selectedProject: Project.CalculateDarkMatterNasa,
      eligibleProjects: [
        Project.CalculateDarkMatterNasa,
        Project.CollectInformationForXpto,
        Project.DetermineSchrodingerCatIsAlive,
        Project.SupportUsersFromXyz,
      ],
      ineligibleProjects: [],
    };
  }
}
