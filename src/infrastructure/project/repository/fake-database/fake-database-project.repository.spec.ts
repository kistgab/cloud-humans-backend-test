import { ProjectMapper } from '@/infrastructure/project/mapper/project.mapper';
import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import { ProjectModel } from '@/infrastructure/project/repository/fake-database/project.model';
import * as fs from 'fs';

function createFakeProject(): ProjectModel {
  return {
    title: 'any_title',
    minimum_score: 15,
    description: 'any_description',
  };
}

describe('FakeDatabaseProject - Repository', () => {
  describe('findAllEligibles', () => {
    it('should load the json correctly', async () => {
      const sut = new FakeDatabaseProjectRepository();
      const readFileSpy = jest.spyOn(fs, 'readFileSync');

      await sut.findAllEligibles(15);

      expect(readFileSpy).toHaveBeenCalledWith(
        'data/static-projects.json',
        'utf-8',
      );
    });

    it('should call the mapper with correct values', async () => {
      jest
        .spyOn(JSON, 'parse')
        .mockReturnValueOnce({ projects: [createFakeProject()] });
      const sut = new FakeDatabaseProjectRepository();
      const mapperSpy = jest.spyOn(ProjectMapper, 'toEntity');

      await sut.findAllEligibles(15);

      expect(mapperSpy).toHaveBeenCalledWith(createFakeProject());
      expect(mapperSpy).toHaveBeenCalledTimes(1);
    });
  });
});
