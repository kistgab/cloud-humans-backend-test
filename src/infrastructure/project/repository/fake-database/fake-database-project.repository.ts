import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { FindEligibleProjectsRepository } from '@/domain/project/repository/find-eligible-projects.repository';
import { ProjectMapper } from '@/infrastructure/project/mapper/project.mapper';
import { ProjectModel } from '@/infrastructure/project/repository/fake-database/project.model';
import * as fs from 'fs';

export class FakeDatabaseProjectRepository
  implements FindEligibleProjectsRepository
{
  async findAllEligibles(score: number): Promise<ProjectEntity[]> {
    const projectsData = this.loadProjects();
    const eligibleProjects = projectsData
      .filter((project) => project.minimum_score < score)
      .map(ProjectMapper.toEntity);
    return eligibleProjects;
  }

  private loadProjects(): ProjectModel[] {
    return JSON.parse(fs.readFileSync('data/static-projects.json', 'utf-8'))
      .projects;
  }
}
