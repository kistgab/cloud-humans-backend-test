import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { ProjectEntity } from '@/domain/entities/projects/project.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { Project } from '@/domain/enums/projects.enum';
import { FindEligibleProjectsRepository } from '@/domain/repositories/find-eligible-projects.repository';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';

function createFakeProjects(): ProjectEntity[] {
  return [
    new ProjectEntity(
      'calculate_dark_matter_nasa',
      10,
      'Calculate the Dark Matter of the universe for Nasa',
    ),
    new ProjectEntity(
      'determine_schrodinger_cat_is_alive',
      5,
      "Determine if the Schrodinger's cat is alive",
    ),
    new ProjectEntity(
      'support_users_from_xyz',
      3,
      'Attend to users support for a YXZ Company',
    ),
    new ProjectEntity(
      'collect_information_for_xpto',
      2,
      'Collect specific people information from their social media for XPTO Company',
    ),
  ];
}

function createFindEligibleProjectsRepositoryStub(): FindEligibleProjectsRepository {
  class FindEligibleProjectsRepositoryStub
    implements FindEligibleProjectsRepository
  {
    findEligible(): Promise<ProjectEntity[]> {
      return Promise.resolve(createFakeProjects());
    }
  }
  return new FindEligibleProjectsRepositoryStub();
}

type SutTypes = {
  sut: PairProWithProjectUseCase;
  findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
};

function createSut(): SutTypes {
  const findEligibleProjectsRepositoryStub =
    createFindEligibleProjectsRepositoryStub();
  const sut = new PairProWithProjectUseCase(findEligibleProjectsRepositoryStub);
  return { sut, findEligibleProjectsRepositoryStub };
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

interface PairWithProjectDataProvider {
  input: PairProWithProjectInput;
  expectedResult: PairProWithProjectOutput;
  pairedProject: Project;
}

const pairWithProjectDataProvider: PairWithProjectDataProvider[] = [
  {
    expectedResult: {
      score: 15,
      selectedProject: Project.CalculateDarkMatterNasa,
      eligibleProjects: createFakeProjects().map((p) => p.title),
      ineligibleProjects: [],
    },
    pairedProject: Project.CalculateDarkMatterNasa,
    input: createFakeInput(),
  },
];

describe('PairProWithProject - Use Case', () => {
  it('should call the FindEligibleProjectsRepository with correct value', () => {
    const { sut, findEligibleProjectsRepositoryStub } = createSut();
    const findEligibleSpy = jest.spyOn(
      findEligibleProjectsRepositoryStub,
      'findEligible',
    );

    sut.pair(createFakeInput());

    expect(findEligibleSpy).toHaveBeenCalledWith(15);
  });

  it('should throw if FindEligibleProjectsRepository throws', () => {
    const { sut, findEligibleProjectsRepositoryStub } = createSut();
    jest
      .spyOn(findEligibleProjectsRepositoryStub, 'findEligible')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const promise = sut.pair(createFakeInput());

    expect(promise).rejects.toThrow('Repository error');
  });

  it('should call the ProEntity to calculate the Pro score', async () => {
    const calculateScoreSpy = jest.spyOn(ProEntity.prototype, 'calculateScore');
    const { sut } = createSut();

    await sut.pair(createFakeInput());

    expect(calculateScoreSpy).toHaveBeenCalledTimes(1);
  });

  it.each(pairWithProjectDataProvider)(
    'should pair the Pro to the project "$pairedProject"',
    async ({ expectedResult, input }) => {
      const { sut } = createSut();

      const result = await sut.pair(input);

      expect(result).toEqual(expectedResult);
    },
  );
});
