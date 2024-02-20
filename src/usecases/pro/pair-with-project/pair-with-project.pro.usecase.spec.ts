import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { Project } from '@/domain/enums/projects.enum';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';

function createSut(): PairProWithProjectUseCase {
  return new PairProWithProjectUseCase();
}

function createFakeInput(): PairProWithProjectInput {
  return {
    age: 35,
    educationLevel: EducationLevel.HighSchool,
    pastExperiences: {
      sales: false,
      support: true,
    },
    internetTest: {
      downloadSpeed: 50.4,
      uploadSpeed: 40.2,
    },
    writingScore: 0.6,
    referralCode: 'any_referral_code',
  };
}

describe('PairProWithProject - Use Case', () => {
  it('should return an empty list for eligible projects when the Pro is underage', () => {
    const input = createFakeInput();
    input.age = 17;
    const sut = createSut();

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
