import { Expose } from 'class-transformer';
import { Status } from 'generated/prisma';

export class ResponseProjectDTO {
  @Expose()
  project_id: number;

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
  member_id: number;
}
