import { ProEntity } from '@/domain/entities/pro/pro.entity';
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

function createFakeInput(
  customProps?: Partial<PairProWithProjectInput>,
): PairProWithProjectInput {
  return {
    age: customProps?.age || 25,
    educationLevel:
      customProps?.educationLevel || EducationLevel.BachelorsDegreeOrHigher,
    pastExperiences: customProps?.pastExperiences || {
      sales: true,
      support: true,
    },
    internetTest: customProps?.internetTest || {
      downloadSpeed: 100,
      uploadSpeed: 100,
    },
    writingScore: customProps?.writingScore || 1,
    referralCode: customProps?.referralCode || 'token1234',
  };
}

describe('PairProWithProject - Use Case', () => {
  it('should call the ProEntity to calculate the Pro score', () => {
    const calculateScoreSpy = jest.spyOn(ProEntity.prototype, 'calculateScore');
    const sut = createSut();

    sut.pair(createFakeInput());

    expect(calculateScoreSpy).toHaveBeenCalledTimes(1);
  });

  it("should pair the Pro to the project 'calculate_dark_matter_nasa' when have the necessary score", () => {
    const sut = createSut();

    const result = sut.pair(createFakeInput());

    const expectedResult: PairProWithProjectOutput = {
      score: 15,
      selectedProject: Project.CalculateDarkMatterNasa,
      eligibleProjects: [
        Project.CalculateDarkMatterNasa,
        Project.CollectInformationForXpto,
        Project.DetermineSchrodingerCatIsAlive,
        Project.SupportUsersFromXyz,
      ],
      ineligibleProjects: [],
    };
    expect(result).toEqual(expectedResult);
  });
});
