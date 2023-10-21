import {Task} from "./task";

interface File {
  id: number;
  name: string;
  path: string;
  task: Task;
}

export { File };
