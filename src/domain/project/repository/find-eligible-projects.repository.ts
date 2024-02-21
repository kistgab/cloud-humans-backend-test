import { ProjectEntity } from '@/domain/project/entity/project.entity';

export interface FindEligibleProjectsRepository {
  findEligible: (proScore: number) => Promise<ProjectEntity[]>;
}
