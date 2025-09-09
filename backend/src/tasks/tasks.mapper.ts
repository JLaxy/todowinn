import { Status } from 'generated/prisma';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

// Maps DTO to model in database
export class TaskMapper {
  // Maps DTO to entity, matching prisma model
  static toCreateEntity(dto: CreateTaskDTO) {
    return {
      name: dto.name,
      description: dto.description,
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined, // Convert date to match ISO
      remarks: dto.remarks,
      project_id: dto.project_id,
    };
  }

  // Maps DTO to entity, matching prisma model
  static toUpdateEntity(dto: UpdateTaskDTO) {
    return {
      name: dto.name,
      description: dto.description,
      // Convert to dateISO
      date_target: dto.dateTarget ? new Date(dto.dateTarget) : undefined, // Convert date to match ISO
      // If updated status is finished, set current date
      date_finished: dto.status === Status.FINISHED ? new Date() : null,
      status: dto.status,
      remarks: dto.remarks,
    };
  }
}
