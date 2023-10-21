import {User} from "./user";

interface Project {
  id: number;
  name: string;
  description: string;
  manager: User;
}

export { Project };
