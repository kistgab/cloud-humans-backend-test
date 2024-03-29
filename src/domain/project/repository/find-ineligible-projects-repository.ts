import { ProjectEntity } from '@/domain/project/entity/project.entity';

export interface FindIneligibleProjectsRepository {
  findAllIneligibles(proScore: number): Promise<ProjectEntity[]>;
}
