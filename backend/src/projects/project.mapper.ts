import { Status } from 'generated/prisma';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

// Maps DTO to model in database
export class ProjectMapper {
  // Converts DTO to createEntity; to automatically format date to ISO
  static toCreateEntity(member_id: number, dto: CreateProjectDTO) {
    return {
      name: dto.name,
      description: dto.description,
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined,
      remarks: dto.remarks,
      member_id,
    };
  }

  // Converts DTO to updateEntity; to automatically format date to ISO
  static toUpdateEntity(dto: UpdateProjectDTO) {
    return {
      name: dto.name,
      description: dto.description,
      // Convert to dateISO
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined,
      // If updated status is finished, set current date
      date_finished: dto.status === Status.FINISHED ? new Date() : null,
      status: dto.status,
      remarks: dto.remarks,
    };
  }
}
