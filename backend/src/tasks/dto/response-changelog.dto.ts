import { Expose } from 'class-transformer';
import { UpdateableTaskField } from 'generated/prisma';

export class ResponseChangelogDTO {
  @Expose()
  changelog_id: number;

  @Expose()
  old: string;

  @Expose()
  new: string;

  @Expose()
  date: Date;

  @Expose()
  task_id: number;

  @Expose()
  field: UpdateableTaskField;
}
