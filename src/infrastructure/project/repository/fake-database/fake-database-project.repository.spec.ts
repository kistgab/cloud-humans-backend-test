import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { ProjectMapper } from '@/infrastructure/project/mapper/project.mapper';
import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import * as fs from 'fs';
import { ProjectModel } from './project.model';

function createFakeProject(): ProjectModel {
  return {
    title: 'any_title',
    minimum_score: 15,
    description: 'any_description',
  };
}

describe('FakeDatabaseProject - Repository', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('any_value');
    jest
      .spyOn(JSON, 'parse')
      .mockReturnValueOnce({ projects: [createFakeProject()] });
  });

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
      const sut = new FakeDatabaseProjectRepository();
      const mapperSpy = jest.spyOn(ProjectMapper, 'toEntity');

      await sut.findAllEligibles(15);

      expect(mapperSpy).toHaveBeenCalledWith(createFakeProject());
      expect(mapperSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an list of Projects on success', async () => {
      const sut = new FakeDatabaseProjectRepository();

      const result = await sut.findAllEligibles(15);

      expect(result.length).toBe(1);
      expect(result[0]).toEqual(
        new ProjectEntity('any_title', 15, 'any_description'),
      );
    });
  });
});