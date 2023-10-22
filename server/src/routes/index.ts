import {Router} from "express";
import {userRouter} from "./user.route";
import {projectRouter} from "./project.route";
import {taskRouter} from "./task.route";
import {fileRouter} from "./file.route";
import {bugReportRouter} from "./bugReport.route";
import {messageRouter} from "./message.route";

const routes = Router();

routes.use('/user', userRouter);
routes.use('/project', projectRouter);
routes.use('/task', taskRouter);
routes.use('/file', fileRouter);
routes.use('/bug-report', bugReportRouter);
routes.use('/message', messageRouter);

export { routes };
