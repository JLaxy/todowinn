import { Expose } from 'class-transformer';
import { Status } from 'generated/prisma';

export class ResponseTaskDTO {
  @Expose()
  task_id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  date_target?: Date;

  @Expose()
  date_created: Date;

  @Expose()
  date_finished?: Date;

  @Expose()
  status: Status;

  @Expose()
  remarks?: string;

  @Expose()
  project_id: number;
}
