import {Project} from "./project";
import {User} from "./user";

enum TaskPriority {
  LOW,
  NORMAL,
  HIGH,
  URGENT
}

enum TaskStatus {
  CREATED,
  IN_PROCESS,
  DELAYED,
  CANCELED,
  COMPLETED
}

interface Task {
  id: number;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  project: Project;
  assignee: User;
  createdAt: Date;
  modifiedAt: Date;
  deadline: Date;
}

export {TaskPriority, TaskStatus};
export type {Task};
