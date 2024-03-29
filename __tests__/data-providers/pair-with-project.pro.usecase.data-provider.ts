import { EducationLevel } from '@/domain/pro/enums/education-levels.enum';
import { IsValidReferralCodeRepository } from '@/domain/pro/repository/is-valid-referral-code.repository';
import { FindEligibleProjectsRepository } from '@/domain/project/repository/find-eligible-projects.repository';
import { FindIneligibleProjectsRepository } from '@/domain/project/repository/find-ineligible-projects-repository';
import {
  PairProWithProjectInput,
  PairProWithProjectOutput,
} from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';
import {
  createFakePairWithProjectInput,
  createFakeProjects,
} from '__tests__/utils/pair-with-project-utils.pro.usecase';

abstract class SchrodingerCatData {
  private static eligibleProjects = createFakeProjects()
    .map((p) => p.title)
    .filter((p) => p !== 'calculate_dark_matter_nasa');
  private static selectedProject = 'determine_schrodinger_cat_is_alive';
  private static ineligibleProjects = ['calculate_dark_matter_nasa'];
  private static expectedScore = 6;
  private static input = createFakePairWithProjectInput({
    educationLevel: EducationLevel.HighSchool,
    pastExperiences: { sales: false, support: true },
    writingScore: 0.6,
    internetTest: {
      downloadSpeed: 50.4,
      uploadSpeed: 40.2,
    },
  });
  private static mocksCallback(stubs: {
    findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
    findIneligibleProjectsRepositoryStub: FindIneligibleProjectsRepository;
  }): void {
    jest
      .spyOn(stubs.findEligibleProjectsRepositoryStub!, 'findAllEligibles')
      .mockReturnValueOnce(
        Promise.resolve(
          createFakeProjects().filter(
            (p) => p.title !== 'calculate_dark_matter_nasa',
          ),
        ),
      );
    jest
      .spyOn(stubs.findIneligibleProjectsRepositoryStub!, 'findAllIneligibles')
      .mockReturnValueOnce(
        Promise.resolve([
          createFakeProjects().find(
            (p) => p.title === 'calculate_dark_matter_nasa',
          )!,
        ]),
      );
  }
  static dataProviderRecord: PairWithProjectDataProvider = {
    expectedResult: {
      score: this.expectedScore,
      selectedProject: this.selectedProject,
      eligibleProjects: this.eligibleProjects,
      ineligibleProjects: this.ineligibleProjects,
    },
    pairedProjectTitle: this.selectedProject,
    input: { ...this.input, referralCode: undefined },
    mocksCallback: this.mocksCallback,
  };
}

abstract class SupportUsersData {
  private static eligibleProjects = [
    'support_users_from_xyz',
    'collect_information_for_xpto',
  ];
  private static ineligibleProjects = [
    'calculate_dark_matter_nasa',
    'determine_schrodinger_cat_is_alive',
  ];
  private static selectedProject = 'support_users_from_xyz';
  private static expectedScore = 4;
  private static input = createFakePairWithProjectInput({
    educationLevel: EducationLevel.BachelorsDegreeOrHigher,
    pastExperiences: { sales: false, support: false },
    writingScore: 0.6,
    internetTest: {
      downloadSpeed: 50.2,
      uploadSpeed: 40.2,
    },
    referralCode: 'invalid-token',
  });
  private static mocksCallback(stubs: {
    findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
    findIneligibleProjectsRepositoryStub: FindIneligibleProjectsRepository;
    isValidReferralCodeRepositoryStub: IsValidReferralCodeRepository;
  }): void {
    jest
      .spyOn(stubs.findEligibleProjectsRepositoryStub!, 'findAllEligibles')
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
      .spyOn(stubs.findIneligibleProjectsRepositoryStub!, 'findAllIneligibles')
      .mockReturnValueOnce(
        Promise.resolve(
          createFakeProjects().filter(
            (p) =>
              p.title === 'determine_schrodinger_cat_is_alive' ||
              p.title === 'calculate_dark_matter_nasa',
          ),
        ),
      );
    jest
      .spyOn(stubs.isValidReferralCodeRepositoryStub, 'isValidReferralCode')
      .mockReturnValueOnce(Promise.resolve(false));
  }
  static dataProviderRecord: PairWithProjectDataProvider = {
    expectedResult: {
      score: this.expectedScore,
      selectedProject: this.selectedProject,
      eligibleProjects: this.eligibleProjects,
      ineligibleProjects: this.ineligibleProjects,
    },
    pairedProjectTitle: this.selectedProject,
    input: this.input,
    mocksCallback: this.mocksCallback,
  };
}

abstract class CalculateDarkMatterData {
  private static eligibleProjects = createFakeProjects().map((p) => p.title);
  private static ineligibleProjects = [];
  private static selectedProject = 'calculate_dark_matter_nasa';
  private static expectedScore = 15;
  private static input = createFakePairWithProjectInput();
  static dataProviderRecord: PairWithProjectDataProvider = {
    expectedResult: {
      score: this.expectedScore,
      selectedProject: this.selectedProject,
      eligibleProjects: this.eligibleProjects,
      ineligibleProjects: this.ineligibleProjects,
    },
    pairedProjectTitle: this.selectedProject,
    input: this.input,
  };
}

abstract class CollectInformationData {
  private static eligibleProjects = ['collect_information_for_xpto'];
  private static ineligibleProjects = [
    'calculate_dark_matter_nasa',
    'determine_schrodinger_cat_is_alive',
    'support_users_from_xyz',
  ];
  private static selectedProject = 'collect_information_for_xpto';
  private static expectedScore = 3;
  private static input = createFakePairWithProjectInput({
    educationLevel: EducationLevel.NoEducation,
    pastExperiences: { sales: false, support: false },
    writingScore: 0.6,
    internetTest: {
      downloadSpeed: 50.2,
      uploadSpeed: 40.2,
    },
    referralCode: 'token1234',
  });
  private static mocksCallback(stubs: {
    findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
    findIneligibleProjectsRepositoryStub: FindIneligibleProjectsRepository;
  }): void {
    jest
      .spyOn(stubs.findEligibleProjectsRepositoryStub!, 'findAllEligibles')
      .mockReturnValueOnce(
        Promise.resolve(
          createFakeProjects().filter(
            (p) => p.title === 'collect_information_for_xpto',
          ),
        ),
      );
    jest
      .spyOn(stubs.findIneligibleProjectsRepositoryStub!, 'findAllIneligibles')
      .mockReturnValueOnce(
        Promise.resolve(
          createFakeProjects().filter(
            (p) => p.title !== 'collect_information_for_xpto',
          ),
        ),
      );
  }
  static dataProviderRecord: PairWithProjectDataProvider = {
    expectedResult: {
      score: this.expectedScore,
      selectedProject: this.selectedProject,
      eligibleProjects: this.eligibleProjects,
      ineligibleProjects: this.ineligibleProjects,
    },
    pairedProjectTitle: this.selectedProject,
    input: this.input,
    mocksCallback: this.mocksCallback,
  };
}

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
  CalculateDarkMatterData.dataProviderRecord,
  SchrodingerCatData.dataProviderRecord,
  SupportUsersData.dataProviderRecord,
  CollectInformationData.dataProviderRecord,
];
