import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { Project } from '@/domain/enums/projects.enum';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';

describe('PairProWithProject - Use Case', () => {
  it('should return an empty list for eligible projects when the Pro is underage', () => {
    const input: PairProWithProjectInput = {
      age: 17,
      educationLevel: EducationLevel.BachelorsDegreeOrHigher,
      pastExperiences: {
        sales: false,
        support: true,
      },
      internetTest: {
        downloadSpeed: 1,
        uploadSpeed: 1,
      },
      writingScore: 1,
      referralCode: 'any_referral_code',
    };
    const sut = new PairProWithProjectUseCase();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 0,
      selectedProject: null,
      eligibleProjects: [],
      ineligibleProjects: [
        Project.CalculateDarkMatterNasa,
        Project.CollectInformationForXpto,
        Project.DetermineSchrodingerCatIsAlive,
        Project.SupportUsersFromXyz,
      ],
    };
    expect(output).toEqual(expectedResult);
  });
});
