import {Router} from "express";
import {getCount} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get('/count', getCount);

export { taskRouter };
