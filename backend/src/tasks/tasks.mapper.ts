import { Status } from 'generated/prisma';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

// Maps DTO to model in database
export class TaskMapper {
  static toCreateEntity(dto: CreateTaskDTO) {
    return {
      name: dto.name,
      description: dto.description,
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined,
      remarks: dto.remarks,
      project_id: dto.project_id,
    };
  }

  static toUpdateEntity(dto: UpdateTaskDTO) {
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
