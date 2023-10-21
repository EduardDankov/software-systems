import {User} from "./user";
import {Task} from "./task";

interface BugReport {
  id: number;
  description: string;
  reportedBy: User;
  task: Task;
}

export { BugReport };
