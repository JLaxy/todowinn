import { Status } from 'generated/prisma';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

export class ProjectMapper {
  // Converts DTO to createEntity
  static toCreateEntity(dto: CreateProjectDTO, member_id: number) {
    return {
      name: dto.name,
      description: dto.description,
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined,
      remarks: dto.remarks,
      member_id,
    };
  }

  // Converts DTO to updateEntity
  static toUpdateEntity(dto: UpdateProjectDTO) {
    return {
      name: dto.name,
      description: dto.description,
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined,
      // If updated status is finished, set current date
      date_finished: dto.status === Status.FINISHED ? new Date() : null,
      status: dto.status,
      remarks: dto.remarks,
    };
  }
}
