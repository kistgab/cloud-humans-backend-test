import { ProEntity } from '@/domain/pro/entity/pro.entity';
import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { FindEligibleProjectsRepository } from '@/domain/project/repository/find-eligible-projects.repository';
import { FindIneligibleProjectsRepository } from '@/domain/project/repository/find-ineligible-projects-repository';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';
import { pairWithProjectDataProvider } from '__tests__/data-providers/pair-with-project.pro.usecase.data-provider';
import {
  createFakePairWithProjectInput,
  createFakeProjects,
} from '__tests__/utils/pair-with-project-utils.pro.usecase';

function createFindEligibleProjectsRepositoryStub(): FindEligibleProjectsRepository {
  class FindEligibleProjectsRepositoryStub
    implements FindEligibleProjectsRepository
  {
    findAllEligibles(): Promise<ProjectEntity[]> {
      return Promise.resolve(createFakeProjects());
    }
  }
  return new FindEligibleProjectsRepositoryStub();
}

function createFindIneligibleProjectsRepositoryStub(): FindIneligibleProjectsRepository {
  class FindIneligibleProjectsRepositoryStub
    implements FindIneligibleProjectsRepository
  {
    findAllIneligibles(): Promise<ProjectEntity[]> {
      return Promise.resolve([]);
    }
  }
  return new FindIneligibleProjectsRepositoryStub();
}

type SutTypes = {
  sut: PairProWithProjectUseCase;
  findEligibleProjectsRepositoryStub: FindEligibleProjectsRepository;
  findIneligibleProjectsRepositoryStub: FindIneligibleProjectsRepository;
};

function createSut(): SutTypes {
  const findEligibleProjectsRepositoryStub =
    createFindEligibleProjectsRepositoryStub();
  const findIneligibleProjectsRepositoryStub =
    createFindIneligibleProjectsRepositoryStub();
  const sut = new PairProWithProjectUseCase(
    findEligibleProjectsRepositoryStub,
    findIneligibleProjectsRepositoryStub,
  );
  return {
    sut,
    findEligibleProjectsRepositoryStub,
    findIneligibleProjectsRepositoryStub,
  };
}

describe('PairProWithProject - Use Case', () => {
  it('should call the FindEligibleProjectsRepository with correct value', async () => {
    const { sut, findEligibleProjectsRepositoryStub } = createSut();
    const findEligibleSpy = jest.spyOn(
      findEligibleProjectsRepositoryStub,
      'findAllEligibles',
    );

    await sut.pair(createFakePairWithProjectInput());

    expect(findEligibleSpy).toHaveBeenCalledWith(15);
  });

  it('should throw if FindEligibleProjectsRepository throws', () => {
    const { sut, findEligibleProjectsRepositoryStub } = createSut();
    jest
      .spyOn(findEligibleProjectsRepositoryStub, 'findAllEligibles')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const promise = sut.pair(createFakePairWithProjectInput());

    expect(promise).rejects.toThrow('Repository error');
  });

  it('should call the FindIneligibleProjectsRepository with correct value', async () => {
    const { sut, findIneligibleProjectsRepositoryStub } = createSut();
    const findIneligibleSpy = jest.spyOn(
      findIneligibleProjectsRepositoryStub,
      'findAllIneligibles',
    );

    await sut.pair(createFakePairWithProjectInput());

    expect(findIneligibleSpy).toHaveBeenCalledWith(15);
  });

  it('should throw if FindIneligibleProjectsRepository throws', () => {
    const { sut, findIneligibleProjectsRepositoryStub } = createSut();
    jest
      .spyOn(findIneligibleProjectsRepositoryStub, 'findAllIneligibles')
      .mockReturnValueOnce(Promise.reject(new Error('Repository error')));

    const promise = sut.pair(createFakePairWithProjectInput());

    expect(promise).rejects.toThrow('Repository error');
  });

  it('should call the ProEntity to calculate the Pro score', async () => {
    const calculateScoreSpy = jest.spyOn(ProEntity.prototype, 'calculateScore');
    const { sut } = createSut();

    await sut.pair(createFakePairWithProjectInput());

    expect(calculateScoreSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if the ProEntity throws', async () => {
    jest
      .spyOn(ProEntity.prototype, 'calculateScore')
      .mockImplementationOnce(() => {
        throw new Error('ProEntity error');
      });
    const { sut } = createSut();

    const promise = sut.pair(createFakePairWithProjectInput());

    expect(promise).rejects.toThrow('ProEntity error');
  });

  describe('should pair the pro with the project', () => {
    it.each(pairWithProjectDataProvider)(
      "'$pairedProjectTitle'",
      async ({ expectedResult, input, mocksCallback }) => {
        const { sut, ...stubs } = createSut();
        mocksCallback && mocksCallback(stubs);

        const result = await sut.pair(input);

        expect(result).toEqual(expectedResult);
      },
    );
  });
});
