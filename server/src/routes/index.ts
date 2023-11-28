import {Router} from "express";
import {userRouter} from "./user.route";
import {projectRouter} from "./project.route";
import {taskRouter} from "./task.route";
import {testRouter} from "./test.route";

const routes = Router();

routes.use('/user', userRouter);
routes.use('/project', projectRouter);
routes.use('/task', taskRouter);
routes.use('/test', testRouter);

export { routes };
