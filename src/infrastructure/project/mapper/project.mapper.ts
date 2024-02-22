import { ProjectEntity } from '@/domain/project/entity/project.entity';
import { ProjectModel } from '@/infrastructure/project/repository/fake-database/project.model';

export class ProjectMapper {
  static toEntity(model: ProjectModel): ProjectEntity {
    return new ProjectEntity(
      model.title,
      model.minimum_score,
      model.description,
    );
  }
}
