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

function schrodingerCatIsAliveMocksCallback(stubs: {
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
  educationLevel: EducationLevel.HighSchool,
  pastExperiences: { sales: false, support: true },
  writingScore: 0.6,
  internetTest: {
    downloadSpeed: 50.4,
    uploadSpeed: 40.2,
  },
  referralCode: 'token1234',
});

function supportUsersMocksCallback(stubs: {
  findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
  findIneligibleProjectsRepositoryStub: FindIneligibleProjectsRepository;
}): void {
  jest
    .spyOn(stubs.findEligibleProjectsRepositoryStub!, 'findEligible')
    .mockReturnValueOnce(
      Promise.resolve(
        createFakeProjects().filter(
          (p) =>
            p.title !== 'determine_schrodinger_cat_is_alive' &&
            p.title !== 'calculate_dark_matter_nasa',
        ),
      ),
    );
  jest
    .spyOn(stubs.findIneligibleProjectsRepositoryStub!, 'findIneligible')
    .mockReturnValueOnce(
      Promise.resolve(
        createFakeProjects().filter(
          (p) =>
            p.title === 'determine_schrodinger_cat_is_alive' ||
            p.title === 'calculate_dark_matter_nasa',
        ),
      ),
    );
}

const supportUsersInput = createFakePairWithProjectInput({
  educationLevel: EducationLevel.HighSchool,
  pastExperiences: { sales: false, support: false },
  writingScore: 0.6,
  internetTest: {
    downloadSpeed: 50.2,
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
  {
    expectedResult: {
      score: 7,
      selectedProject: 'determine_schrodinger_cat_is_alive',
      eligibleProjects: schrodingerCatIsAliveEligibleProjects,
      ineligibleProjects: ['calculate_dark_matter_nasa'],
    },
    pairedProjectTitle: 'determine_schrodinger_cat_is_alive',
    input: schrodingerCatIsAliveInput,
    mocksCallback: schrodingerCatIsAliveMocksCallback,
  },
  {
    expectedResult: {
      score: 4,
      selectedProject: 'support_users_from_xyz',
      eligibleProjects: [
        'support_users_from_xyz',
        'collect_information_for_xpto',
      ],
      ineligibleProjects: [
        'calculate_dark_matter_nasa',
        'determine_schrodinger_cat_is_alive',
      ],
    },
    pairedProjectTitle: 'support_users_from_xyz',
    input: supportUsersInput,
    mocksCallback: supportUsersMocksCallback,
  },
];
