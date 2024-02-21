import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { FindEligibleProjectsRepository } from '@/domain/project/repository/find-eligible-projects.repository';
import { ProjectModel } from '@/infrastructure/project/repository/fake-database/project.model';
import * as fs from 'fs';

export class FakeDatabaseProjectRepository
  implements FindEligibleProjectsRepository
{
  async findAllEligibles(score: number): Promise<ProjectEntity[]> {
    score;
    this.loadProjects();
    return [];
  }

  private loadProjects(): ProjectModel[] {
    return JSON.parse(fs.readFileSync('data/static-projects.json', 'utf-8'))
      .projects;
  }
}
