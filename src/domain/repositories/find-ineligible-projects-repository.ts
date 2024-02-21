import { ProjectEntity } from '@/domain/entities/projects/project.entity';

export interface FindIneligibleProjectsRepository {
  findIneligible(proScore: number): Promise<ProjectEntity[]>;
}
