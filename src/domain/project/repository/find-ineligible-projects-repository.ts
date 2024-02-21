import { ProjectEntity } from '@/domain/project/entity/project.entity';

export interface FindIneligibleProjectsRepository {
  findIneligible(proScore: number): Promise<ProjectEntity[]>;
}
