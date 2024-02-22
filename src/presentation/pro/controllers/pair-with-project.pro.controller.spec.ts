import { EducationLevel } from '@/domain/pro/enums/education-levels.enum';
import { RequestPairWithProject } from '@/infrastructure/pro/dto/pair/request-pair-with-project.dto';
import { PairProWithProjectUseCaseFactory } from '@/infrastructure/pro/factory/pair-with-project-usecase.pro.factory';
import { PairProWithProjectController } from '@/presentation/pro/controllers/pair-with-project.pro.controller';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';

function createFakeInput(): RequestPairWithProject {
  return {
    age: 20,
    education_level: EducationLevel.HighSchool,
    past_experiences: {
      sales: true,
      support: true,
    },
    internet_test: {
      download_speed: 10,
      upload_speed: 10,
    },
    writing_score: 10,
    referral_code: '123',
  };
}

function createSut(): PairProWithProjectController {
  return new PairProWithProjectController();
}

describe('PairProWithProject - Controller', () => {
  it('should call the usecase with correct values', async () => {
    const sut = createSut();
    const pairSpy = jest.spyOn(PairProWithProjectUseCase.prototype, 'pair');

    await sut.handle(createFakeInput());

    expect(pairSpy).toHaveBeenCalledWith({
      age: 20,
      educationLevel: EducationLevel.HighSchool,
      pastExperiences: {
        sales: true,
        support: true,
      },
      internetTest: {
        downloadSpeed: 10,
        uploadSpeed: 10,
      },
      writingScore: 10,
      referralCode: '123',
    });
  });

  it('should call the usecase factory', async () => {
    const sut = createSut();
    const pairSpy = jest.spyOn(PairProWithProjectUseCaseFactory, 'create');

    await sut.handle(createFakeInput());

    expect(pairSpy).toHaveBeenCalledTimes(1);
  });
});
