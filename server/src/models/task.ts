import {Project} from "./project";
import {User} from "./user";

enum TaskStatus {
  CREATED,
  IN_PROCESS,
  DELAYED,
  CANCELED,
  COMPLETED
}

enum TaskPriority {
  LOW,
  NORMAL,
  HIGH,
  URGENT
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

export { Task };
