import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

export class ProjectMapper {
  // Converts DTO to createEntity
  static toCreateEntity(dto: CreateProjectDTO) {
    return {
      name: dto.name,
      date_created: dto.dateCreated ? new Date(dto.dateCreated) : new Date(),
    };
  }

  // Converts DTO to updateEntity
  static toUpdateEntity(dto: UpdateProjectDTO) {
    return {
      name: dto.name,
      date_created: dto.dateCreated ? new Date(dto.dateCreated) : undefined,
    };
  }
}
