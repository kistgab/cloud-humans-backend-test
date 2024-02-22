import { ProjectEntity } from '@/domain/project/entity/project.entity';

export interface FindEligibleProjectsRepository {
  findAllEligibles: (proScore: number) => Promise<ProjectEntity[]>;
}
