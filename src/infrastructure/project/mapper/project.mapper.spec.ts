import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { ProjectMapper } from '@/infrastructure/project/mapper/project.mapper';
import { ProjectModel } from '@/infrastructure/project/repository/fake-database/project.model';

describe('Project - Mapper', () => {
  describe('toEntity', () => {
    it('should map the Model to entity correctly', () => {
      const model: ProjectModel = {
        description: 'description',
        title: 'title',
        minimum_score: 10,
      };

      const result = ProjectMapper.toEntity(model);

      expect(result).toEqual(new ProjectEntity('title', 10, 'description'));
    });
  });
});
