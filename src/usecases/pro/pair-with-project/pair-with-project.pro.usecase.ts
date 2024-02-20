import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { Project } from '@/domain/enums/projects.enum';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export class PairProWithProjectUseCase {
  pair(input: PairProWithProjectInput): PairProWithProjectOutput {
    const pro = new ProEntity(
      input.age,
      input.educationLevel,
      input.pastExperiences,
      input.internetTest,
      input.writingScore,
      input.referralCode,
    );

    return {
      score: pro.calculateScore(),
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
