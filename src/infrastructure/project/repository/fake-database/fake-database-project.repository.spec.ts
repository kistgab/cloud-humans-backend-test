import { FakeDatabaseProjectRepository } from '@/infrastructure/project/repository/fake-database/fake-database-project.repository';
import * as fs from 'fs';

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
  });
});
