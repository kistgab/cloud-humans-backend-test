import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import { PairProWithProjectUseCase } from '@/usecases/pro/pair-with-project/pair-with-project.pro.usecase';

export abstract class PairProWithProjectUseCaseFactory {
  static create(): PairProWithProjectUseCase {
    const projectRepository = new FakeDatabaseProjectRepository();
    return new PairProWithProjectUseCase(projectRepository, projectRepository);
  }
}
