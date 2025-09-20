export type Changelog = {
  changelog_id: number;
  old: string;
  new: string;
  date: string;
  task_id: number;
  field: TaskField;
};

export enum TaskField {
  NAME,
  DESCRIPTION,
  DATE_TARGET,
  STATUS,
  REMARKS,
}
