import { ProjectMapper } from '@/infrastructure/project/mapper/project.mapper';
import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import { ProjectModel } from '@/infrastructure/project/repository/fake-database/project.model';
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

    it('should only return the projects that Pro can be eligible by his score', async () => {
      const sut = createSut();
      const allEligibleProjects = JSON.parse(
        readFileSync('data/static-projects.json', 'utf-8'),
      )
        .projects.filter((p: ProjectModel) => p.minimum_score < 6)
        .map(ProjectMapper.toEntity);

      const projects = await sut.findAllEligibles(6);

      expect(projects).toEqual(allEligibleProjects);
    });

    it('should return no projects', async () => {
      const sut = createSut();

      const projects = await sut.findAllEligibles(0);

      expect(projects).toHaveLength(0);
    });
  });

  describe('findAllIneligibles', () => {
    it('should return no projects when the Pro score is the maximum', async () => {
      const sut = createSut();

      const projects = await sut.findAllIneligibles(100);

      expect(projects).toHaveLength(0);
    });

    it('should only return the projects that Pro cannot be eligible by his score', async () => {
      const sut = createSut();
      const allIneligibleProjects = JSON.parse(
        readFileSync('data/static-projects.json', 'utf-8'),
      )
        .projects.filter((p: ProjectModel) => p.minimum_score >= 6)
        .map(ProjectMapper.toEntity);

      const projects = await sut.findAllIneligibles(6);

      expect(projects).toEqual(allIneligibleProjects);
    });

    it('should return all projects', async () => {
      const sut = createSut();
      const allProjects = JSON.parse(
        readFileSync('data/static-projects.json', 'utf-8'),
      ).projects.map(ProjectMapper.toEntity);

      const projects = await sut.findAllIneligibles(0);

      expect(projects).toEqual(allProjects);
    });
  });
});
