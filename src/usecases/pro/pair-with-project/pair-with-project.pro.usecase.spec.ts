import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { PairProWithProjectInput } from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';
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
  it('should call the ProEntity to calculate the Pro score', () => {
    const calculateScoreSpy = jest.spyOn(ProEntity.prototype, 'calculateScore');
    const input = createFakeInput();
    const sut = createSut();

    sut.pair(input);

    expect(calculateScoreSpy).toHaveBeenCalledTimes(1);
  });
});
