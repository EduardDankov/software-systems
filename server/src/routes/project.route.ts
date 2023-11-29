import {Router} from "express";
import {
  deleteProjectData,
  getCount,
  getProjectData,
  insertProjectData,
  updateProjectData
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get('/data', getProjectData);
projectRouter.get('/count', getCount);

projectRouter.post('/create', insertProjectData);
projectRouter.post('/update', updateProjectData);
projectRouter.post('/delete', deleteProjectData);

export { projectRouter };
