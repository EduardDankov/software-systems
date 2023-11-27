import {Router} from "express";
import {getCount, getProjectData, insertProjectData, updateProjectData} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get('/data', getProjectData);
projectRouter.get('/count', getCount);

projectRouter.post('/create', insertProjectData);
projectRouter.post('/update', updateProjectData);

export { projectRouter };
