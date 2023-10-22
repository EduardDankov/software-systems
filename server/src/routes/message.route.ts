import {Router} from "express";
import {getCount} from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get('/count', getCount);

export { messageRouter };
