import { Status } from "./status";

export type Project = {
  project_id: number;
  name: string;
  description: string;
  date_target?: string;
  date_created?: string;
  date_finished?: string;
  status: Status;
  remarks?: string;
};
