import {Router} from "express";
import {
  deleteTaskData,
  getCount,
  getTaskData,
  getTaskDataByProject,
  insertTaskData,
  updateTaskData
} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get('/data', getTaskData);
taskRouter.get('/data-by-project', getTaskDataByProject);
taskRouter.get('/count', getCount);

taskRouter.post('/create', insertTaskData);
taskRouter.post('/update', updateTaskData);
taskRouter.post('/delete', deleteTaskData);

export { taskRouter };
