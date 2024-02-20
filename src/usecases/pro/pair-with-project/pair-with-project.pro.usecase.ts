import { Project } from '@/domain/enums/projects.enum';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export class PairProWithProjectUseCase {
  pair(input: PairProWithProjectInput): PairProWithProjectOutput {
    input;
    return {
      eligibleProjects: [],
      score: 0,
      selectedProject: null,
      ineligibleProjects: [
        Project.CalculateDarkMatterNasa,
        Project.CollectInformationForXpto,
        Project.DetermineSchrodingerCatIsAlive,
        Project.SupportUsersFromXyz,
      ],
    };
  }
}
