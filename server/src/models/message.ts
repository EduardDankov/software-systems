import {User} from "./user";

interface Message {
  id: number;
  sender: User;
  receiver: User;
  content: string;
  timestamp: Date;
}

export { Message };
