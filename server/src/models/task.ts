import {Project} from "./project";
import {User} from "./user";

interface Task {
  id: number;
  name: string;
  description: string;
  project: Project;
  assignee: User;
}

export { Task };
