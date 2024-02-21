import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { ProjectMapper } from '@/infrastructure/project/mapper/project.mapper';
import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import { readFileSync } from 'fs';

function createSut(): FakeDatabaseProjectRepository {
  return new FakeDatabaseProjectRepository();
}

describe('FakeDatabaseProject - Repository', () => {
  describe('findAllEligibles', () => {
    it('should return all projects when the Pro score is the maximum', async () => {
      const sut = createSut();
      const allProjects = JSON.parse(
        readFileSync('data/static-projects.json', 'utf-8'),
      ).projects.map(ProjectMapper.toEntity);

      const projects = await sut.findAllEligibles(100);

      expect(projects).toEqual(allProjects);
    });

    it('should only the projects that Pro can be eligible by his score', async () => {
      const sut = createSut();
      const allEligibleProjects = JSON.parse(
        readFileSync('data/static-projects.json', 'utf-8'),
      )
        .projects.map(ProjectMapper.toEntity)
        .filter((p: ProjectEntity) => p.minimumScore < 6);

      const projects = await sut.findAllEligibles(6);

      expect(projects).toEqual(allEligibleProjects);
    });
  });
});
