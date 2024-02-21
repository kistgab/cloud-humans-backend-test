import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { FindEligibleProjectsRepository } from '@/domain/repositories/find-eligible-projects.repository';
import { FindIneligibleProjectsRepository } from '@/domain/repositories/find-ineligible-projects-repository';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';
import {
  createFakePairWithProjectInput,
  createFakeProjects,
} from '@test/utils/pair-with-project-utils.pro.usecase';

const schrodingerCatIsAliveEligibleProjects = createFakeProjects()
  .map((p) => p.title)
  .filter((p) => p !== 'calculate_dark_matter_nasa');

function mocksCallbackSchrodingerCatIsAlive(stubs: {
  findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
  findIneligibleProjectsRepositoryStub: FindIneligibleProjectsRepository;
}): void {
  jest
    .spyOn(stubs.findEligibleProjectsRepositoryStub!, 'findEligible')
    .mockReturnValueOnce(
      Promise.resolve(
        createFakeProjects().filter(
          (p) => p.title !== 'calculate_dark_matter_nasa',
        ),
      ),
    );
  jest
    .spyOn(stubs.findIneligibleProjectsRepositoryStub!, 'findIneligible')
    .mockReturnValueOnce(
      Promise.resolve([
        createFakeProjects().find(
          (p) => p.title === 'calculate_dark_matter_nasa',
        )!,
      ]),
    );
}

const schrodingerCatIsAliveInput = createFakePairWithProjectInput({
  age: 35,
  educationLevel: EducationLevel.HighSchool,
  pastExperiences: { sales: false, support: true },
  writingScore: 0.6,
  internetTest: {
    downloadSpeed: 50.4,
    uploadSpeed: 40.2,
  },
  referralCode: 'token1234',
});

interface PairWithProjectDataProvider {
  input: PairProWithProjectInput;
  expectedResult: PairProWithProjectOutput;
  pairedProjectTitle: string;
  mocksCallback?(stubs: {
    findEligibleProjectsRepositoryStub?: FindEligibleProjectsRepository;
    findIneligibleProjectsRepositoryStub?: FindIneligibleProjectsRepository;
  }): void;
}

export const pairWithProjectDataProvider: PairWithProjectDataProvider[] = [
  {
    expectedResult: {
      score: 15,
      selectedProject: 'calculate_dark_matter_nasa',
      eligibleProjects: createFakeProjects().map((p) => p.title),
      ineligibleProjects: [],
    },
    pairedProjectTitle: 'calculate_dark_matter_nasa',
    input: createFakePairWithProjectInput(),
  },
];
