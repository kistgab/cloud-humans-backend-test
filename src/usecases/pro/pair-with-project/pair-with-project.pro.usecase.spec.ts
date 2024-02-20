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
    educationLevel: EducationLevel.NoEducation,
    pastExperiences: {
      sales: false,
      support: false,
    },
    internetTest: {
      downloadSpeed: 40.2,
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

  it('should add one score point to the Pro that has high school EducationLevel', () => {
    const input = createFakeInput();
    input.educationLevel = EducationLevel.HighSchool;
    const sut = createSut();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 1,
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

  it('should add two score points to the Pro that has bachelors degree or higher EducationLevel', () => {
    const input = createFakeInput();
    input.educationLevel = EducationLevel.BachelorsDegreeOrHigher;
    const sut = createSut();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 2,
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

  it('should add no points when the Pro has no education', () => {
    const input = createFakeInput();
    input.educationLevel = EducationLevel.NoEducation;
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

  it('should add 3 points when the Pro has past experiences with support', () => {
    const input = createFakeInput();
    input.pastExperiences.support = true;
    const sut = createSut();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 3,
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

  it('should add no points when the Pro does not has related past experiences', () => {
    const input = createFakeInput();
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

  it('should add 5 points when the Pro has past experiences with sales', () => {
    const input = createFakeInput();
    input.pastExperiences.sales = true;
    const sut = createSut();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 5,
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

  it('should add 8 points when the Pro has past experiences with both sales and support', () => {
    const input = createFakeInput();
    input.pastExperiences = {
      sales: true,
      support: true,
    };
    const sut = createSut();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 8,
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

  it('should add no points when the Pro has a normal internet', () => {
    const input = createFakeInput();
    input.internetTest = {
      downloadSpeed: 30,
      uploadSpeed: 30,
    };
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

  it('should add points when the Pro has a good internet', () => {
    const input = createFakeInput();
    input.internetTest = {
      downloadSpeed: 100,
      uploadSpeed: 30,
    };
    const sut = createSut();

    const output = sut.pair(input);

    const expectedResult: PairProWithProjectOutput = {
      score: 1,
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
