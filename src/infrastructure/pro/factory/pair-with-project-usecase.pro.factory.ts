import { FakeDatabaseReferralCodeRepository } from '@/infrastructure/pro/repository/fake-database/fake-database-referral-code.repository';
import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';

export abstract class PairProWithProjectUseCaseFactory {
  static create(): PairProWithProjectUseCase {
    const projectRepository = new FakeDatabaseProjectRepository();
    const referralCodeRepository = new FakeDatabaseReferralCodeRepository();
    return new PairProWithProjectUseCase(
      projectRepository,
      projectRepository,
      referralCodeRepository,
    );
  }
}
