import { ProjectEntity } from '@/domain/entities/projects/project.entity';

export interface FindEligibleProjectsRepository {
  findEligible: (proScore: number) => Promise<ProjectEntity[]>;
}
